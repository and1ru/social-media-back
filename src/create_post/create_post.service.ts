import { createPost } from "./create_post.repository.ts";

export class CreatePostService {
  post = async (content: string, userId:string, name:string) => {
    const fecha = new Date();
    
    const post = {
      content,
      fecha,
      userId,
      name
    };
    
    await createPost(post);
  };
}
