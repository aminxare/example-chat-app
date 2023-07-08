import { randomUUID } from "crypto";
import {
  Consumer,
  Kafka,
  Producer,
  logLevel,
  CompressionTypes,
  EachMessagePayload,
  RecordMetadata,
} from "kafkajs";

export interface Broker {
  send: Send;
  receive: Receive;
}

type Send = (
  topic: string,
  messages: string | string[]
) => Promise<RecordMetadata[]>;

type Receive = (
  onEachMessage: (
    eachMessagePayload: EachMessagePayload,
    disconnect: () => void
  ) => void,
  fromBeginning?: boolean
) => Promise<void>;

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
  (topics: string[]): Receive =>
  async (onEachMessage, fromBeginning = true) => {
    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning });
    await consumer.run({
      eachMessage: async (payload) => {
        onEachMessage(payload, consumer.disconnect);
      },
    });
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

  const send = createSender(kafka.producer());
  const receive = createReceiver(kafka.consumer({ groupId }))(topics);

  return {
    send,
    receive,
  };
};
