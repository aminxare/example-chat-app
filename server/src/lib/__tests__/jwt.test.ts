import jwt from "../jwt";
import { config } from "dotenv";

const wait = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

describe("jwt", () => {
  beforeAll(() => {
    config();
  });

  it("should create valid token", () => {
    const obj = {
      name: "foo",
      n: 10,
    };

    const token = jwt.sign(obj);
    expect(typeof token === "string").toBe(true);

    const decodedObj = jwt.verify(token);
    expect(decodedObj).toMatchObject(obj);
  });

  it("should returns null when token is expired", async () => {
    const obj = {
      name: "foo",
      n: 10,
    };
    const seconds = 1;

    const token = jwt.sign(obj, seconds);

    await wait(seconds + 0.5);
    const decodedObj = jwt.verify(token);
    expect(decodedObj).toBeNull()
  });
});
