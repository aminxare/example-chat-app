import { randomUUID } from "crypto";
import EventEmitter from "events";

import {
  Consumer,
  Kafka,
  Producer,
  logLevel,
  CompressionTypes,
  RecordMetadata,
} from "kafkajs";

export interface Broker {
  send: Send;
  receive: Receive;
}

type Receive = (fromBeginning?: boolean) => Receiver;

type Send = (
  topic: string,
  messages: string | string[]
) => Promise<RecordMetadata[]>;

class Receiver extends EventEmitter {
  private static _instance: Receiver;

  private constructor(private consumer: Consumer, private topics: string[]) {
    super();
  }

  static instance(consumer: Consumer, topics: string[]) {
    if (this._instance) return this._instance;
    return new Receiver(consumer, topics);
  }

  async run(fromBeginning = true) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topics: this.topics, fromBeginning });
    await this.consumer.run({
      eachMessage: async (payload) => {
        this.emit(payload.topic, payload);
      },
    });
  }
}

const createSender =
  (producer: Producer) =>
  async (topic: string, messages: string | string[]) => {
    messages = Array.isArray(messages) ? messages : [messages];

    await producer.connect();
    const recordedMetaData = await producer.send({
      topic,
      messages: messages.map((m) => ({ value: m })),
      compression: CompressionTypes.GZIP,
    });
    await producer.disconnect();
    return recordedMetaData;
  };

const createReceiver =
  (consumer: Consumer) =>
  (topics: string[]) =>
  (fromBeginning = true) => {
    const receiver = Receiver.instance(consumer, topics);
    receiver.run(fromBeginning);
    return receiver;
  };

export const createMessager = (
  brokers: string[],
  topics: string[], // the topics that we are listening
  groupId: string,
  clientId?: string
): Broker => {
  const kafka = new Kafka({
    brokers: brokers,
    clientId: clientId || randomUUID(),
    logLevel: logLevel.NOTHING,
  });

  const consumer = kafka.consumer({ groupId });
  const send = createSender(kafka.producer());
  const receive = createReceiver(kafka.consumer({ groupId }))(topics);

  return {
    send,
    receive,
  };
};
