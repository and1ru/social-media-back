import { describe, expect, vi, it, beforeEach } from "vitest";
import { findLikeRepository } from "../../../shared/repositories/findLikeRepository/findLikeRepository.repository";
import { deleteLikeRepository, likeRepository } from "../like.repository";
import { countLikesPosts } from "../../../shared/repositories/countLikesPosts/countLikesPosts.repository";
import { LikesService } from "../like.service";
import { ObjectId } from "mongodb";
import { findPost } from "../../../shared/repositories/findPostById/findPostById.repository";

vi.mock("../../../shared/repositories/findPostById/findPostById.repository")
vi.mock("../../../shared/repositories/findLikeRepository/findLikeRepository.repository")
vi.mock("../like.repository")
vi.mock("../../../shared/repositories/countLikesPosts/countLikesPosts.repository")

describe("Service POST /like/:postId", () => {
    let service: LikesService
    const postId = new ObjectId().toString()
    const userId = new ObjectId().toString()
    const likeId = new ObjectId()

    beforeEach(() => {
        service = new LikesService()
    })

    it("liked", async () => {
        vi.mocked(findPost).mockResolvedValue({_id:new ObjectId(postId)})
        vi.mocked(findLikeRepository).mockResolvedValue(null)
        vi.mocked(likeRepository)
        vi.mocked(countLikesPosts).mockResolvedValue(10)

        await service.likes(postId, userId)

        expect(findPost).toHaveBeenCalledWith(postId)
        expect(findLikeRepository).toHaveBeenCalledWith(userId, postId)
        expect(likeRepository).toHaveBeenCalledWith(userId, postId)
        expect(countLikesPosts).toHaveBeenCalledWith(postId)
        expect(deleteLikeRepository).not.toHaveBeenCalled()
    })

    it("disliked", async () => {
        vi.mocked(findPost).mockResolvedValue({_id:new ObjectId(postId)})
        vi.mocked(findLikeRepository).mockResolvedValue({_id:likeId})
        vi.mocked(deleteLikeRepository)
        vi.mocked(countLikesPosts).mockResolvedValue(10)

        await service.likes(postId, userId)

        expect(findPost).toHaveBeenCalledWith(postId)
        expect(findLikeRepository).toHaveBeenCalledWith(userId, postId)
        expect(deleteLikeRepository).toHaveBeenCalledWith(likeId)
        expect(countLikesPosts).toHaveBeenCalledWith(postId)
        expect(likeRepository).not.toHaveBeenCalledWith()
    })

    it("did not find post", async () => {
        vi.mocked(findPost).mockResolvedValue(null)

        await expect(service.likes(postId, userId)).rejects.toThrow("no post")

        expect(findPost).toHaveBeenCalledWith(postId)
        expect(findLikeRepository).not.toHaveBeenCalled()
        expect(deleteLikeRepository).not.toHaveBeenCalled()
        expect(countLikesPosts).not.toHaveBeenCalled()
        expect(likeRepository).not.toHaveBeenCalled()
    })
})