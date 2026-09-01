import { myDb } from "../../helpers/pool.ts";

interface PostI{
  content:string;
  userId:string;
  name:string;
  fecha:string
}

export const createPost = async (post: PostI) => {
  return await myDb.collection("posts").insertOne({ ...post });
};
