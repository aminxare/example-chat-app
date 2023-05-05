import { readdir, stat } from "fs/promises";
import { join, isAbsolute, basename } from "path";

type CallbackFunction = (module: { [key: string]: any }, path: string) => void;

const isDirectory = async (path: string) => (await stat(path)).isDirectory();
const filename = (path: string) => basename(path);
const removeExtention = (filename: string) =>
  filename.split(".").slice(0, -1).join(".");

export const runCallbackOnDirectory = async (
  dir: string,
  cb: CallbackFunction,
  regex?: RegExp
) => {
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);

    if (regex && !regex.test(fullPath)) continue;
    if (await isDirectory(fullPath)) {
      await runCallbackOnDirectory(fullPath, cb, regex);
      continue;
    }

    const module = require(isAbsolute(fullPath) ? fullPath : `./${fullPath}`);
    cb(module, fullPath);
  }
};

/**
 *
 * @param dir the directory that modules exist there
 * @param regex
 * @returns returns a map that key is filename without extention and value is object of exported values
 * if key is directory, value is a Map object
 */
export const getModules = async (dir: string, regex?: RegExp) => {
  const entries = await readdir(dir);
  const map = new Map<string, object>();

  for (const entry of entries) {
    const fullPath = join(dir, entry);

    if (regex && !regex.test(fullPath)) continue;
    if (await isDirectory(fullPath)) {
      const m = await getModules(fullPath, regex);
      map.set(filename(fullPath), m);
      continue;
    }

    const module = require(isAbsolute(fullPath) ? fullPath : `./${fullPath}`);
    map.set(removeExtention(filename(fullPath)), module);
  }
  return map;
};