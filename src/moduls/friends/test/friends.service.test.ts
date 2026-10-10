import { describe, expect, vi, it, beforeEach } from "vitest";
import { findUserById } from "../../../shared/repositories/findUser/findUser.repository";
import { findFriends } from "../friends.repository";
import { ObjectId } from "mongodb";
import { FriendsService } from "../friends.service";

vi.mock("../../../shared/repositories/findUser/findUser.repository")
vi.mock("../friends.repository")

describe("Service GET /friends", () => {
    const userId = new ObjectId()
    let service: FriendsService
    const friend1 = new ObjectId()
    const friend2 = new ObjectId()

    beforeEach(() => {
        service = new FriendsService()
    })
    
    it("got friends", async () => {
        vi.mocked(findUserById).mockResolvedValue({ _id:userId, email: "mock@gmail.com", name: "mock name", password: "mock password", friends:[friend1.toString(), friend2.toString()]})

        vi.mocked(findFriends).mockResolvedValue([{ _id:friend1, name:"mock name"}, { _id:friend2, name:"mock name"}])

        await service.friends(userId.toString())

        expect(findUserById).toHaveBeenCalledWith(userId.toString())
        expect(findFriends).toHaveBeenCalledWith([friend1.toString(), friend2.toString()])
    })

    it("did not find user", async () => {
        vi.mocked(findUserById).mockResolvedValue(null)

        await expect(service.friends(userId.toString())).rejects.toThrow("no user")

        expect(findUserById).toHaveBeenCalledWith(userId.toString())
        expect(findFriends).not.toHaveBeenCalled()
    })
})