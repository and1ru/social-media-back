import { CustomError } from "../../helpers/customError";
import { countLikesPosts } from "../../shared/repositories/countLikesPosts/countLikesPosts.repository";
import { findLikeRepository } from "../../shared/repositories/findLikeRepository/findLikeRepository.repository";
import { findPost } from "../../shared/repositories/findPostById/findPostById.repository";

export class GetLikesService {
  likes = async (postId: string, userId: string) => {
    // verifica que post exista
    const post = await findPost(postId);
    if (!post) {
      throw new CustomError("no post", 404);
    }

    // verifica si ya dio like al post
    const isLiked = await findLikeRepository(userId, postId);

    // si no le ha dado like
    if (!isLiked) {
      const likes = await countLikesPosts(postId);

      return { likes, liked: false };
    }

    // si ya dio like
    const likes = await countLikesPosts(postId);
    return { likes, liked: true };
  };
}
