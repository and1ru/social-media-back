import { CustomError } from "../../helpers/customError";
import { findPost } from "../../shared/repositories/findPostById/findPostById.repository";
import { getComments, countComments } from "./get_post_comment.repository";

export class GetPostCommentsService {
  getPostComments = async (postId: string) => {
    // verificar si existe el post
    const post = await findPost(postId);
    if (!post) {
      throw new CustomError("no post", 404);
    }

    const comments = await getComments(postId);

    const commentCount = await countComments(postId);

    const result = {
      commentCount,
      comments,
    };

    return result;
  };
}
