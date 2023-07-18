import room from "../../../models/room";
import user from "../../../models/user";
import { Socket } from "socket.io";

interface RoomCreatePayload {
  name: string;
  avatar: string;
}

export const createRoomListener =
  (socket: Socket) => async ({name, avatar}: RoomCreatePayload, cb) => {
    const userObj = await user().findByPk(socket['user'].id);
    if(!userObj) {
      return cb("user not found")
    }
    const roomObj = await room().create({
        creatorId: userObj.get("id"),
        name,
        avatar,
      });
    
      // add creator to room
      (roomObj as any).addUser(userObj)
    
      cb(roomObj.toJSON())
  };
