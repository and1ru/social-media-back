import { createPost } from "./create_post.repository.ts";

export class CreatePostService {
  post = async (content: string, userId:string, name:string) => {
    const fecha = new Date();
    
    const dia = fecha.getDate()
    const mes = fecha.getMonth()

    const post = {
      content,
      fecha:`${dia} - ${mes + 1}`,
      userId,
      name
    };
    
    await createPost(post);
  };
}
