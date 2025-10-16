import crypto from "crypto";

const createRandomString = (num: number) => {
  return [...Array(num)].map(() => Math.random().toString(36)[2]).join("");
};

const base64Url = (buffer: Buffer) => {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

export const verifier = createRandomString(128);
const sha256Hash = crypto.createHash("sha256").update(verifier).digest();
const base64UrlEncodedVerifier = base64Url(sha256Hash);

export const dataCrypt = {
  state: createRandomString(40),
  challenge: base64UrlEncodedVerifier,
};
