import { CustomError } from "../helpers/custom-error"
import { getComments, countComments } from "./get_post_comment.repository"

export class GetPostCommentsService {
    getPostComments = async (postId:string) => {
        // verificar si existe el post
        const comments = await getComments(postId)

        const commentCount = await countComments(postId)

        const result = {
            commentCount,
            comments

        }

        return result
    }
}