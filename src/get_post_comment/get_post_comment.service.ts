import { CustomError } from "../helpers/custom-error"
import { getComments } from "./get_post_comment.repository"

export class GetPostCommentsService {
    getPostComments = async (postId:string) => {
        // verificar si existe el post
        const post = await getComments(postId)

        if(!post){
            return new CustomError("no post", 404)
        }

        return post
    }
}