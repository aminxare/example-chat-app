import { Model, ModelStatic, Sequelize } from "sequelize";
import { join } from "path";
import { getModules } from "../utils/autoLoad";

type IModel = ModelStatic<Model<any, any>>;

interface Schema {
  tableName: string;
  table: {
    [key: string]: any;
  };
  options: {
    [key: string]: any;
  };
}

interface ModelModule {
  priority: number;
  schema: () => Schema;
  afterDefine: (model: IModel) => void;
}

const defineModel = (sequelize: Sequelize, schema: Schema) => {
  return sequelize.define(schema.tableName, schema.table, schema.options);
  //return new Promise((resolve) => User.afterSync(resolve));
};

const connect = async () => {
  const host = process.env.DATABASE_HOST!;
  const dialect: any = process.env.DATABASE_DIALECT!;
  const database = process.env.DATABASE!;
  const username = process.env.DATABASE_USERNAME!;
  const password = process.env.DATABASE_PASSWORD!;

  const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    // logging: (msg) => console.log("[sequelize] ==>  ", msg),
    logging: false,
  });

  await sequelize.authenticate(); // check connection
  return sequelize;
};

const config = async () => {
  console.log("[database] connecting to database...");
  const sequelize = await connect();

  console.log("[database] creating models...");
  const mods = await getModules(join(__dirname, "..", "models"));

  const promises = Array.from(mods)
    .sort((a: any, b: any) => {
      const ap = a[1].priority ?? 0;
      const bp = b[1].priority ?? 0;
      return ap - bp;
    })
    .map(([filename, mod]) => {
      const { schema, afterDefine } = mod as ModelModule;
      const model = defineModel(sequelize, schema());
      if (typeof afterDefine === "function") afterDefine(model);
      model.sync({ alter: true });
      return new Promise((resolve) => model.afterSync(resolve));
    });

  await Promise.all(promises);
  return sequelize;
};

export default config;
