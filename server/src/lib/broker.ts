import { randomUUID } from "crypto";
import {
  Consumer,
  EachMessageHandler,
  Kafka,
  Producer,
  Partitioners,
  Admin,
  logLevel,
} from "kafkajs";

interface BrokerConfig {
  groupID: string;
  brokers: string[];
  topics: string[];
  clientID?: string;
}

/**
 * A connector to kafka
 */
class Broker {
  private kafka: Kafka;
  private kafkaAdmin: Admin;
  private producer: Producer;
  private consumer: Consumer;

  // it should private, for create a new instance use 'new' method
  private constructor(private config: BrokerConfig) {
    this.kafka = new Kafka({
      // brokers: process.env.KAFKA_BROKERS?.split(" ") || ["localhost:9092"],
      // clientId: process.env.CLIENT_ID,
      brokers: this.config.brokers,
      clientId: this.config.clientID ?? randomUUID(),
      logLevel: logLevel.NOTHING
    });

    this.kafkaAdmin = this.kafka.admin();
    this.consumer = this.kafka.consumer({ groupId: this.config.groupID });
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  }

  /**
   * create a new instance of broker
   * @param config
   * @returns new instance of broker
   */
  static async new(config: BrokerConfig) {
    const instance = new Broker(config);
    await instance.init();
    return instance;
  }

  /** send message */
  public async sendMessage(topic: string, messages: string | string[]) {
    messages = Array.isArray(messages) ? messages : [messages];
    const { producer } = this;
    await producer.connect();
    const recordedMetaData = await producer.send({
      topic,
      messages: messages.map((m) => ({ value: m })),
    });
    await producer.disconnect();
    return recordedMetaData;
  }

  /**
   * start reciving for message
   *
   * @param topic the message will comes from this topic
   * @param onEachMessage handler for recived messages
   * @param fromBeginning it determins should messages recive from beginning?
   * @returns
   */
  public async startRecivingMessages(
    topic: string,
    onEachMessage: EachMessageHandler,
    fromBeginning = true
  ) {
    const { consumer } = this;
    await consumer.subscribe({ topic, fromBeginning });
    await consumer.run({
      eachMessage: onEachMessage,
    });
    return consumer;
  }

  /**
   * it initilize the topic, consumer, producer, etc.
   */
  private async init() {
    const topics = this.config.topics;
    const consumer = this.consumer;

    await consumer.connect();
    await consumer.subscribe({ topics: topics });

    if (topics && topics.length) this.createTopics(topics);
  }

  private async createTopics(topics: string[]) {
    this.kafkaAdmin.createTopics({
      topics: topics.map((topic) => ({ topic })),
    });
  }
}

export default Broker;
