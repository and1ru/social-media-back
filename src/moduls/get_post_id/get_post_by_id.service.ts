import { CustomError } from "../../helpers/customError";
import { findPost } from "../../shared/repositories/findPostById.repository";

export class PostByIdService {
  postById = async (postId: string) => {
    // verificar que el post exista
    const post = await findPost(postId);

    if (!post) {
      throw new CustomError("no post", 404);
    }

    return post;
  };
}
