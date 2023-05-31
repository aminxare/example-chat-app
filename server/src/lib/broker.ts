import { Consumer, EachMessageHandler, Kafka, Partitioners, Producer } from "kafkajs";
export { Kafka as Broker, Producer, Consumer } from "kafkajs";

export const init = () => {
  const kafka = new Kafka({
    brokers: process.env.KAFKA_BROKERS?.split(" ") || ["localhost:9092"],
    clientId: process.env.CLIENT_ID,
  });

  return kafka;
};

export const createKafkaProducer = (kafka: Kafka) => kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

export const createKafkaConsumer = (kafka: Kafka, groupId: string) =>
  kafka.consumer({ groupId });

export const sendMessage = async (
  producer: Producer,
  topic: string,
  messages: unknown[]
) => {
  await producer.connect();
  const recordedMetaData = await producer.send({
    topic,
    messages: messages.map((m) => ({ value: JSON.stringify(m) })),
  });
  await producer.disconnect();
  return recordedMetaData;
};

export const startRecivingMessages = async (
  consumer: Consumer,
  topic: string,
  onEachMessage: EachMessageHandler,
  fromBeginning: boolean = true
) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning });
  await consumer.run({
    eachMessage: onEachMessage,
  });
  return consumer;
};
