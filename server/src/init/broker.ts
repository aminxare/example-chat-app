import { listenMessages } from "../features";
import Broker from "../lib/broker";

export const runBroker = async () => {
  const broker = await Broker.new({
    brokers: ["localhost:9092"],
    groupID: "server",
    topics: ["message-create", "validate-token", "token-validated"],
  });

  await listenMessages(broker);
};
