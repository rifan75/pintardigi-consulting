import { Buffer } from "buffer";
import Hashids from "hashids";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

const hashids = new Hashids(secretKey, 16, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-");

export const createHashId = (value: string | any) => {
  var hex = Buffer.from(value, "utf8").toString("hex");
  return hashids.encodeHex(hex);
};

export const decodeHashId = (value: string | any) => {
  const decodedHex = hashids.decodeHex(value);
  const string = Buffer.from(decodedHex, "hex").toString("utf8");
  return string;
};
