import {
  startRecivingMessages,
  sendMessage,
  Consumer,
  Producer,
} from "../../../lib/broker";
import messageModel from "../../../models/message";

export const listenMessages = async (
  producer: Producer,
  consumer: Consumer
) => {
  await startRecivingMessages(
    consumer,
    "message-create",
    async ({ topic, message }) => {
      if (!message.value) return;

      const messageObj = JSON.parse(message.value?.toString());
      const savedMessage = await messageModel().create({
        text: messageObj.payload,
        createdAt: messageObj.date,
        // userid ...
      });

      await sendMessage(producer, "message-created-id", [
        { id: savedMessage.get("id") },
      ]);
    }
  );
};
