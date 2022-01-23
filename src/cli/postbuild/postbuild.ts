import { uploadMetadata } from "./metadata";

export const postbuild = async () => {
  await uploadMetadata();
};
