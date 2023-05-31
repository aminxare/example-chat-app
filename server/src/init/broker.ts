import { listenMessages } from "../features";
import { init, createKafkaConsumer, createKafkaProducer } from "../lib/broker";

export const runBroker = async () => {
  const broker = init();
  await listenMessages(
    createKafkaProducer(broker),
    createKafkaConsumer(broker, "server")
  );
};
