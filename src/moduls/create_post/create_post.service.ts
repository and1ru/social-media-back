import { createPost } from "./create_post.repository.ts";

export class CreatePostService {
  createPost = async (content: string, userId:string, name:string) => {
    const date = new Date();
    
    const dia = date.getDate()
    const mes = date.getMonth()

    const post = {
      content,
      fecha:`${dia} - ${mes + 1}`,
      userId,
      name
    };
    
    await createPost(post);
  };
}