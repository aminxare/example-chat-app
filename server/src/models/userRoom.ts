import { DataTypes, Model, ModelStatic } from "sequelize";
import user from "./user";
import room from "./room";
let UserRoom: ModelStatic<Model<any, any>>;

export const priority = 3;

const table = () => ({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: user(),
      key: "id",
    },
  },

  roomId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: room(),
      key: "id",
    },
  },
});

export const schema = () =>
  Object.freeze({
    tableName: "userRoom",
    table: table(),
    options: {},
  });

export const afterDefine = (model: ModelStatic<Model<any, any>>) => {
  UserRoom = model;
  room().belongsToMany(user(), { through: userRoom() });
  user().belongsToMany(room(), { through: userRoom() });
};

const userRoom = () => UserRoom;

export default userRoom;
