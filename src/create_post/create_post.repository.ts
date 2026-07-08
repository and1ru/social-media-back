import { myDb } from "../helpers/pool.ts";

// tiene que definir un tipo, no puede ser any
export const createPost = async (post: any) => {
  return await myDb.collection("posts").insertOne({ ...post });
};
