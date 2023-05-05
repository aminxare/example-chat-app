import { compare, encrypt } from "../bcrypt";

describe("bcrypt", () => {
  it("it should ecrypt password", () => {
    const password = "9JW8Xy9wLk%mrprl&2nBjY8ZJHs4D4a&lGayf*T%&qFUUd!rty";
    const wrongPass = "123";
    const encPass = encrypt(password);
    expect(encPass).toBeTruthy();
    expect(typeof encPass).toEqual("string");

    const correct = compare(password, encPass);
    const wrong = compare(wrongPass, encPass);
    expect(correct).toEqual(true);
    expect(wrong).toEqual(false);
  });
});
