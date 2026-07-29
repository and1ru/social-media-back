import { CustomError } from "../helpers/custom-error"
import { postByIdRepository } from "./get_post_by_id.repository"

export class PostByIdService {
    postById = async (postId:string) => {
        // verificar que el post exista
        const post = await postByIdRepository(postId)
        console.log("----------------------------")
        console.log(post)
        if(!post){
            throw new CustomError("no post", 404)
        }

        return post
    }
}