import { socketListenser } from "@types";
import message from "../../../models/message";
import userRoom from "../../../models/userRoom";
import { QueryTypes } from "sequelize";
import { getSocketId } from "../../../database/redis/connection";
import { Socket } from "socket.io";

interface sendMessagePayload {
  text: string;
  roomId: string;
  createDate: string;
  creatorMessage: string;
}

export const sendMessageListener: socketListenser =
  (socket) => async (incomeMessage: sendMessagePayload, cb) => {
    const user = socket["user"];
    incomeMessage = { ...incomeMessage, creatorMessage: user.username };
    const { createDate, roomId, text } = incomeMessage;

    try {
      // const messageObj = await message().create({
      //   from,
      //   roomId: to,
      //   text,
      //   createDate,
      // });

      sendMessage(incomeMessage, roomId, socket);
      socket.to(roomId).emit("message:receive", incomeMessage);
    } catch (err: any) {
      cb(err.message);
    }
  };

/**
 * Send a message to all users in a room who are online.
 * 
 * @param incomeMessage - The message payload to send.
 * @param roomId - The ID of the room to send the message to.
 * @param socket - The socket instance to use for sending the message.
 */
const sendMessage = async (
  incomeMessage: sendMessagePayload,
  roomId: string,
  socket: Socket
) => {
  const pageSize = 100;
  let pageNumber = 1;
  let users: any[] = [];

  const query = `
    SELECT users.username
    FROM userRooms RIGHT JOIN users
    ON users.id = userRooms.userId
    WHERE userRooms.roomId = :roomId
    LIMIT :limit
    OFFSET :offset;
  `;

  const send = async (
    incomeMessage: sendMessagePayload,
    socketId: string,
    socket: Socket
  ) => {
    socket.to(socketId).emit("message:receive", incomeMessage);
  };

  do {
    users = await userRoom().sequelize?.query(query, {
      replacements: {
        roomId,
        limit: pageSize,
        offset: pageSize * (pageNumber - 1),
      },
      type: QueryTypes.SELECT,
    })!;

    pageNumber++;

    // get socket ids and send message to users that are online
    users
      .forEach((u) => getSocketId(u.username).then(id=>{
        if(id) {
          send(incomeMessage, id, socket)
        }
      }));
    // send message with socket
  } while (users.length > 0);
};
