import jwt from "../../../lib/jwt";

type MessageHandler = (message: string, send: any) => Promise<void> | void;

export const createMessage: MessageHandler = async (
  message: string | undefined,
  send
) => {
  if (!message) return;
  const messageObj = JSON.parse(message);
  // const savedMessage = await messageModel().create({
  //   text: messageObj.payload,
  //   createdAt: messageObj.date,
  //   // userid ...
  // });

  await send("message-created-id", [
    JSON.stringify('{ id: savedMessage.get("id") }'),
  ]);
};

export const validateToken = async (message: string | undefined, send) => {
  if (!message) return;
  try {
    let { id, token } = JSON.parse(message);

    if (!token) {
      await send("token-validated", "{}");
      return;
    }
    const user = jwt.verify(token);
    const payload = JSON.stringify({ id: user ? id : null, user });
    await send("token-validated", payload);
  } catch (err) {
    await send("token-validated", "{}");
  }
};
