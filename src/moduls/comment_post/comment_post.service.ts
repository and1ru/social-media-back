import { CustomError } from "../../helpers/customError";
import { findPost } from "../../shared/repositories/findPostById/findPostById.repository";
import { commentPostRepository } from "./comment_post.repository";

export class CommentPostService {
  commetPost = async ( userId: string,comment: string,postId: string,userName: string,) => {
    // verify that the post exists
    const post = await findPost(postId);
    if (!post) {
      throw new CustomError("no post", 404);
    }

    await commentPostRepository(postId, userId, comment, userName);
  };
}
