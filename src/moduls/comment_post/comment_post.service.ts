import { CustomError } from "../../helpers/custom-error"
import { commetPostRepository, findPost } from "./comment_post.repository"

export class CommentPostService {
    commetPost = async (userId:string, comment:string, postId:string, userName:string) => {
        // verify that the post exists
        const post = await findPost(postId)
        if(!post){
            return new CustomError("no post", 404)
        }

        await commetPostRepository(postId, userId, comment, userName)
    }
}