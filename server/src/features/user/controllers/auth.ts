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

export const postLogin: Handler<loginBody> = async (req, res, next) => {
  const { username, password } = req.body;
  let isNewUser = false;

  if (!username) return next(error("'username' is required!", 400));
  if (!password) return next(error("'password' is required!", 400));

  let userObj = await user().findOne({
    where: {
      username,
    },
  });

  // if user doen't exist, create new user
  if (!userObj) {
    userObj = await user().create({ username, password });
    isNewUser = true;
  }

  if (!isNewUser) {
    const encPass = userObj.get("password") as string;
    const isPassCorrect = compare(password, encPass);
    if (!isPassCorrect) return next(error("invalid password!", 403));
  }

  const { password: _, ...responseUser } = userObj.toJSON();
  const token = jwt.sign({
    responseUser,
  });

  return res
    .status(isNewUser ? 201 : 200)
    .send(response({ token }, isNewUser ? "user created!" : null));
};
