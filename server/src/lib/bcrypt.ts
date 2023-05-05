import { createHash } from "crypto";

export const encrypt = (password: string) => {
  const hash = createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

export const compare = (password: string, key: string) => {
  return encrypt(password) === key;
};
