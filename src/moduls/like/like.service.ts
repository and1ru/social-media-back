import { CustomError } from "../../helpers/custom-error"
import { deleteLikeRepository, findLikeRepository, findPost, likeRepository, countLikesPosts } from "./like.repository"

export class LikesService {
    likes = async (postId:string, userId:string) => {
        // verifica que post exista
        const post = await findPost(postId)
        if(!post){
            throw new CustomError("no post", 404)
        }

        const isLiked = await findLikeRepository(userId, postId)
        if(isLiked){
        // si ya dio like elimina 
            await deleteLikeRepository(isLiked._id)
            const likes = await countLikesPosts(postId)

            return { likes, liked: false }
        }
        // si no ha dado like inserta
        await likeRepository(userId, postId)

        const likes = await countLikesPosts(postId)
        return {likes, liked:true}
    }
}