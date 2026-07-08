import { createPost } from "./create_post.repository.ts";

export class CreatePostService {
  post = async (content: string, userId:string) => {
    const fecha = new Date();
    const post = {
      content,
      fecha,
      userId,
      likes: 0,
      comentarios: []
    };
    
    return await createPost(post);
  };
}
