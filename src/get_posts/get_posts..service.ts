import { getPosts } from "./get_posts..repository.ts"

export class GetPostsService {
    getPost = async () => {
        return await getPosts()
    }
}