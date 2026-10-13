import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CommentPostService } from '../comment_post.service'
import { commentPostRepository } from '../comment_post.repository'
import { ObjectId } from 'mongodb'
import { findPost } from '../../../shared/repositories/findPostById/findPostById.repository'

vi.mock('../../../shared/repositories/findPostById/findPostById.repository')
vi.mock("../comment_post.repository")

describe("Service POST /comment", () => {
    let service:CommentPostService

    const userId = "mock userId"
    const comment = "mock comment"
    const postId = "mock postId"
    const userName = "mock userName"

    beforeEach(() => {
        service = new CommentPostService()
    })

    it("post commented", async () => {
        vi.mocked(findPost).mockResolvedValue({_id: new ObjectId()})
        vi.mocked(commentPostRepository)

        await service.commetPost(userId, comment, postId, userName)

        expect(findPost).toHaveBeenCalledWith(postId)
        expect(commentPostRepository).toHaveBeenCalledWith(postId, userId, comment, userName)
    })

    it("did not find post", async () => {
        vi.mocked(findPost).mockResolvedValue(null)

        await expect(service.commetPost(userId, comment, postId, userName)).rejects.toThrow("no post")
        expect(findPost).toHaveBeenCalledWith(postId)
        expect(commentPostRepository).not.toHaveBeenCalled()
    })
})