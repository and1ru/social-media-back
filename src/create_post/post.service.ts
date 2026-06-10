import { createPost } from "./post.repository.ts"
import type { postType } from "./post.schema.ts"

export class PostService {
    post = async (post:postType) => {
        return await createPost(post)
    }
}