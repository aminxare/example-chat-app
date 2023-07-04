import jwt from "../../../lib/jwt";
import Broker from "../../../lib/broker";
import messageModel from "../../../models/message";

export const listenMessages = async (broker: Broker) => {
  broker.startRecivingMessages("message-create", async ({ message }) => {
    if (!message.value) return;

    const messageObj = JSON.parse(message.value?.toString());
    const savedMessage = await messageModel().create({
      text: messageObj.payload,
      createdAt: messageObj.date,
      // userid ...
    });

    await broker.sendMessage("message-created-id", [
      JSON.stringify({ id: savedMessage.get("id") }),
    ]);
  });

  broker.startRecivingMessages("validate-token", async ({ message }) => {
    let { id, token } = JSON.parse(message.value?.toString()!);
    if (!token) {
      await broker.sendMessage("token-validated", "{}");
      return;
    }
    try {
      const user = jwt.verify(token);
      await broker.sendMessage("token-validated", JSON.stringify({ id, user }));
    } catch (err) {
      await broker.sendMessage("token-validated", "{}");
    }
  });
};
