import { CustomError } from "../helpers/custom-error"
import { postByUserRepository, verifyUser } from "./posts_by_user.repository"

export class PostsByUserService {
    // verificar que el usuario exista
    postByUser = async (userId:string) => {
        const user = await verifyUser(userId)
        if(!user){
            return new CustomError("no user", 404)
        }
        
        const post = await postByUserRepository(userId)

        return post
    }
}