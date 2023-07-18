import { Handler } from "../../../@types";
import { error, response } from "../../../helpers/response";
import room from "../../../models/room";
import user from "../../../models/user";

interface CreateRoomBody {
  creatorId: number;
  avatar?: string;
  name?: string;
}

interface DeleteBody {
  roomId: string;
}

export const createRoom: Handler<CreateRoomBody> = async (req, res) => {
  const {
    creatorId,
    // just the group room have specific name
    name,
    // if type is group that mean the room is a group and can have more than 2 members
    // default is 'private'
    avatar,
  } = req.body;
  const roomObj = await room().create({
    creatorId: Number(creatorId),
    name,
    avatar,
  });
  const userObj = await user().findByPk(req['user'].id);

  // add creator to room
  (roomObj as any).addUser(userObj)

  res.status(200).send(response(roomObj.toJSON(), "room created"));
};

// TODO: only creator can delete the room
export const deleteRoom: Handler<DeleteBody> = async (req, res, next) => {
  const { roomId } = req.body;

  const roomObj = await room().findOne({
    where: {
      id: Number(roomId),
    },
  });
  if (!roomObj) return next(error("room not found!", 404));
  await roomObj.set("isActive", false).save();

  return res.status(200).send(response(null, "room deleted"));
};

export const addMember: Handler<{ username: string }> = async (
  req,
  res,
  next
) => {
  const roomId: string = (req.params as any).roomId;
  const { username } = req.body;
  // user validation
  if (!username) return next(error("username is reqired", 400));
  const userObj = user().findOne({ where: { username } });
  if (!userObj) return next(error("username not found!", 404));

  // room validation
  const roomObj: any = await room().findByPk(roomId);
  if (!roomObj) return next(error("room not found!", 404));

  await roomObj.addUser((await userObj));

  return res.status(200).send(response(true, "added"));
};
