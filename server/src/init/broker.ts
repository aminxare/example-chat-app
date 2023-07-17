import { createMessage, validateToken } from "../features/index";
import { createMessager } from "../lib/broker/";
import { topics } from "../lib/broker/topics";

export const runBroker = async () => {
  const { send, receive } = createMessager(
    ["localhost:9092"],
    Object.values(topics),
    "server"
  );

  const { CREATE_MESSAGE, VALIDATE_TOKEN } = topics;

  receive()
    .on(CREATE_MESSAGE, (payload) =>
      createMessage(payload.message.value?.toString(), send)
    )
    .on(VALIDATE_TOKEN, (payload) => {
      validateToken(payload.message.value?.toString(), send);
    });
};
