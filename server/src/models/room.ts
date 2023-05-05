import { DataTypes, Model, ModelStatic } from "sequelize";
import user from "./user";
let Room: ModelStatic<Model<any, any>>;

// creatorId is refrencing to users
export const priority = 2;

export const schema = () =>
  Object.freeze({
    tableName: "room",
    table: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      creatorId: {
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
  Room = model;
};

const room = () => Room;

export default room;
