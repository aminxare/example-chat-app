import { DataTypes, Model, ModelStatic } from "sequelize";
import user from "./user";
import room from "./room";
let Message: ModelStatic<Model<any, any>>;

export const priority = 3;

export const schema = () =>
  Object.freeze({
    tableName: "message",
    table: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
      },
      roomId: {
        type: DataTypes.INTEGER,
      },
      from: {
        type: DataTypes.INTEGER,
        references: {
          model: user(),
          key: "id",
        },
        allowNull: false,
      },
    },
    options: {},
  });

export const afterDefine = (model: ModelStatic<Model<any, any>>) => {
  Message = model;
  Message.belongsTo(room());
  room().hasMany(message());
};

const message = () => Message;

export default message;
