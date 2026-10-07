import { CustomError } from "../../helpers/customError";
import { findPost } from "../../shared/repositories/findPostById.repository";
import { deletePostRepository } from "./delete_post.repository";

export class DeletePostService {
  deletePost = async (postId: string, userId: string) => {
    // verificar que el post exista
    const post = await findPost(postId);
    if (!post) {
      throw new CustomError("no post", 404);
    }

    // verificar que el post haya sido creado por el mismo usuario
    if (post.userId !== userId) {
      throw new CustomError("you can't delete this", 400);
    }

    await deletePostRepository(postId);
  };
}
