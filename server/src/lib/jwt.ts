import jwt from "jsonwebtoken";

const secrectKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("set 'JWT_SECRET' in envoriment variables!");
  return secret;
};

const sign = (data: object, expiresIn?: number | string) => {
  const secretKey = secrectKey();
  expiresIn = expiresIn || Number(process.env.JWT_EXPIRE) || process.env.JWT_EXPIRE || "1h";
  return jwt.sign(data, secretKey, { expiresIn: expiresIn });
};

/**
 * if returns null, it means token is expired
 * @param token string
 * @returns JwtPayload
 */
const verify = (token: string, options?) => {
  const secretKey = secrectKey();

  try {
    return jwt.verify(token, secretKey, options);
  } catch (e) {
    const err = e as Error;
    if (err.message === "jwt expired") return null;
    throw err;
  }
};

export default {
  sign,
  verify,
};
