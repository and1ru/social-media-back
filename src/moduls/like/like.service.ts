import { CustomError } from "../../helpers/customError";
import { countLikesPosts } from "../../shared/repositories/countLikesPosts/countLikesPosts.repository";
import { findLikeRepository } from "../../shared/repositories/findLikeRepository/findLikeRepository.repository";
import { findPost } from "../../shared/repositories/findPostById/findPostById.repository";
import { deleteLikeRepository, likeRepository } from "./like.repository";

export class LikesService {
  likes = async (postId: string, userId: string) => {
    // verifica que post exista
    const post = await findPost(postId);
    if (!post) {
      throw new CustomError("no post", 404);
    }

    const isLiked = await findLikeRepository(userId, postId);

    // si ya dio like elimina
    if (isLiked) {
      await deleteLikeRepository(isLiked._id);
      const likes = await countLikesPosts(postId);

      return { likes, liked: false };
    }

    // si no ha dado like inserta
    await likeRepository(userId, postId);

    const likes = await countLikesPosts(postId);
    return { likes, liked: true };
  };
}
