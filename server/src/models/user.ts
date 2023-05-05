import { DataTypes, Model, ModelStatic } from "sequelize";
import { encrypt } from "../lib/bcrypt";
let User: ModelStatic<Model<any, any>>;

// set of table to create
// when a table has foreign key it should has higher number
// priority 1 is the most important priority
export const priority = 1;

export const scopes = () => ({
  withoutPassword: "withoutPassword",
});

const table = () => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const schema = () =>
  Object.freeze({
    tableName: "user",
    table: table(),
    options: {
      scopes: {
        [scopes().withoutPassword]: {
          // don't return password
          attributes: { exclude: ["password"] },
        },
      },
    },
  });

export const afterDefine = (model: ModelStatic<Model<any, any>>) => {
  User = model;
  model.addHook("beforeSave", (user, options) => {
    const changes = user.changed();
    const isPassChanged = changes && changes.includes("password");
    if (user.isNewRecord || isPassChanged) {
      // encrypt password
      const password = user.get("password") as string;
      user.set("password", encrypt(password));
    }
  });
};

const user = () => User;

export default user;
