import { describe, expect, vi, it, beforeEach } from "vitest";
import { GetLikesService } from "../get_like.service";
import { countLikesPosts } from "../../../shared/repositories/countLikesPosts/countLikesPosts.repository";
import { findLikeRepository } from "../../../shared/repositories/findLikeRepository/findLikeRepository.repository";
import { ObjectId } from "mongodb";
import { findPost } from "../../../shared/repositories/findPostById/findPostById.repository";

vi.mock("../../../shared/repositories/findPostById/findPostById.repository")
vi.mock("../../../shared/repositories/countLikesPosts/countLikesPosts.repository")
vi.mock("../../../shared/repositories/findLikeRepository/findLikeRepository.repository")

describe("Service GET /like/:postId", () => {
    let service: GetLikesService
    let postId = new ObjectId()
    let userId = "mocked userId"

    beforeEach(() => {
        service = new GetLikesService()
    })

    it("post is liked", async () => {
        vi.mocked(findPost).mockResolvedValue({ _id:postId})
        vi.mocked(countLikesPosts).mockResolvedValue(10)
        vi.mocked(findLikeRepository).mockResolvedValue({_id:postId, })

        await service.likes(postId.toString(), userId)

        expect(findPost).toHaveBeenCalledWith(postId.toString())
        expect(countLikesPosts).toHaveBeenCalledWith(postId.toString())
        expect(findLikeRepository).toHaveBeenCalledWith(userId, postId.toString())
    })

    it("post is not liked", async () => {
        vi.mocked(findPost).mockResolvedValue({ _id:postId})
        vi.mocked(countLikesPosts).mockResolvedValue(10)
        vi.mocked(findLikeRepository).mockResolvedValue(null)

        await service.likes(postId.toString(), userId)

        expect(findPost).toHaveBeenCalledWith(postId.toString())
        expect(countLikesPosts).toHaveBeenCalledWith(postId.toString())
        expect(findLikeRepository).toHaveBeenCalledWith(userId, postId.toString())
    })

    it("did not find post", async () => {
        vi.mocked(findPost).mockResolvedValue(null)

        await expect(service.likes(postId.toString(), userId)).rejects.toThrow("no post")

        expect(findPost).toHaveBeenCalledWith(postId.toString())
        expect(countLikesPosts).not.toHaveBeenCalled()
        expect(findLikeRepository).not.toHaveBeenCalled()
    })
})