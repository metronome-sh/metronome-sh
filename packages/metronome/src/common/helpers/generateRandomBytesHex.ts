import crypto from "node:crypto";

export function generateRandomBytesHex(length: number) {
  return crypto.randomBytes(length).toString("hex").toLowerCase();
}
