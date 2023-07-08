import { createMessage, validateToken } from "../features/index";
import { createMessager } from "../lib/broker/";
import { topics } from "../lib/broker/topics";

export const runBroker = async () => {
  const { send, receive } = createMessager(
    ["localhost:9092"],
    Object.values(topics),
    "server"
  );

  receive(async ({ topic, message }) => {
    if (!message.value) return;

    const { CREATE_MESSAGE, VALIDATE_TOKEN } = topics;
    const messageString = message.value.toString();

    switch (topic) {
      case CREATE_MESSAGE:
        createMessage(messageString, send);
        break;

      case VALIDATE_TOKEN:
        validateToken(messageString, send);
        break;
    }
  });
};
