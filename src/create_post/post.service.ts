import { createPost } from "./post.repository.ts";

export class PostService {
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
