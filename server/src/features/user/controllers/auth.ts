import user from "../../../models/user";
import { response, error } from "../../../helpers/response";
import jwt from "../../../lib/jwt";
import { compare } from "../../../lib/bcrypt";
import { Handler } from "../../../@types";

interface signupBody {
  username: string;
  password: string;
}

interface loginBody {
  username: string;
  password: string;
}

export const postSignup: Handler<signupBody> = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) return next(error("'username' is required!", 400));
  if (!password) return next(error("'password' is required!", 400));

  const userObj = await user().create({ username, password });
  const token = jwt.sign({
    id: userObj.get("id"),
    username: userObj.get("username"),
  });
  return res.status(201).send(response({ token }, "user created!"));
};

export const postLogin: Handler<loginBody> = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) return next(error("'username' is required!", 400));
  if (!password) return next(error("'password' is required!", 400));

  const userObj = await user().findOne({
    where: {
      username,
    },
  });
  if (!userObj) return next(error("user not found!", 404));

  const encPass = userObj.get("password") as string;
  const isPassCorrect = compare(password, encPass);

  if (!isPassCorrect) return next(error("invalid password!", 401));
  const { password: pass, ...responseUser } = userObj.toJSON();

  return res.status(200).send({ ...responseUser });
};