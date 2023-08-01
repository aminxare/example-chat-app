import { createHash } from "crypto";

/**
 * Encrypts a password using the SHA256 algorithm.
 * 
 * @param password - The password to be encrypted.
 * @returns The encrypted password in hexadecimal format.
 */
export const encrypt = (password: string) => {
  // Create a hash object using the SHA256 algorithm
  const hash = createHash("sha256");

  // Update the hash object with the password
  hash.update(password);

  // Return the encrypted password in hexadecimal format
  return hash.digest("hex");
};

/**
 * Compares a password with a key.
 * @param {string} password - The password to compare.
 * @param {string} key - The key to compare with the password.
 * @returns {boolean} - Returns true if the password matches the key, false otherwise.
 */
export const compare = (password: string, key: string) => {
  return encrypt(password) === key;
};
