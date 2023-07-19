import { getSocketId } from "../../../database/redis/connection";
import room from "../../../models/room";
import user from "../../../models/user";
import { Socket } from "socket.io";

interface RoomCreatePayload {
  name: string;
  avatar: string;
}

interface AddMemberPayload {
  username: string;
  roomId: string;
}

type socketListenser = (
  socket: Socket
) => (
  payload: any,
  cb: (err: string | null, ...args: any[]) => void
) => Promise<void> | void;

export const createRoomListener: socketListenser =
  (socket) =>
  async ({ name, avatar }: RoomCreatePayload, cb) => {
    const userObj = await user().findByPk(socket["user"].id);
    if (!userObj) {
      return cb("user not found");
    }
    const roomObj = await room().create({
      creatorId: userObj.get("id"),
      name,
      avatar,
    });

    // add creator to room
    (roomObj as any).addUser(userObj);

    cb(null, roomObj.toJSON());
  };

export const addMemberListener: socketListenser =
  (socket) =>
  async ({ username, roomId }: AddMemberPayload, cb) => {
    const creatorId = +socket["user"]["id"];

    if (!roomId) return cb("roomId is require");
    if (!username) return cb("username is require");

    const userObj = user().findOne({ where: { username } });
    if (!userObj) return cb("user not found");

    const roomObj = await room().findByPk(roomId);
    if (!roomObj) return cb("room not found");
    if (roomObj.get("creatorId") !== creatorId) return cb("not authorized");
    await roomObj["addUser"](await userObj);

    const socketId = await getSocketId(username);
    // if user is online
    if (socketId) socket.to(socketId).emit("room:added", roomObj.toJSON());

    cb(null, true);
  };
