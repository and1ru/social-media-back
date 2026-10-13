import { describe, expect, vi, it, beforeEach } from "vitest";
import { PostsByUserService } from "../posts_by_user.service";
import { findUserById } from "../../../shared/repositories/findUser/findUser.repository";
import { postByUserRepository } from "../posts_by_user.repository";
import { ObjectId } from "mongodb";

vi.mock("../../../shared/repositories/findUser/findUser.repository")
vi.mock("../posts_by_user.repository")

describe("Service POST /post-user/:userId", () => {
    let service:PostsByUserService
    const userId = new ObjectId()

    beforeEach(() => {
        service = new PostsByUserService()
    })

    it("got posts by userId", async () => {
        vi.mocked(findUserById).mockResolvedValue({_id: userId, email:"", friends:[], name: "", password:""})
        vi.mocked(postByUserRepository).mockResolvedValue([{_id: new ObjectId()}])

        await service.postByUser(userId.toString())

        expect(findUserById).toHaveBeenCalledWith(userId.toString())
        expect(postByUserRepository).toHaveBeenCalledWith(userId.toString())
    })

    it("did not find user", async () => {
        vi.mocked(findUserById).mockResolvedValue(null)
        await expect(service.postByUser(userId.toString())).rejects.toThrow("no user")

        expect(findUserById).toHaveBeenCalledWith(userId.toString())
        expect(postByUserRepository).not.toHaveBeenCalled()
    })
})