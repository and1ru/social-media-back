import { describe, expect, vi, it, beforeEach } from "vitest";
import { GetMessagesService } from "../get_message.service";
import { findUserById } from "../../../shared/repositories/findUser/findUser.repository";
import { getMessagesRepository } from "../get_message.repository"; 
import { ObjectId } from "mongodb";

vi.mock("../../../shared/repositories/findUser/findUser.repository")
vi.mock("../get_message.repository")

describe("Service GET /get-messages/:friendId", () => {
    let service: GetMessagesService
    let userId = new ObjectId()
    let friendId = new ObjectId()

    beforeEach(() => {
        service = new GetMessagesService()
    })

    it("got messages", async () => {
        vi.mocked(findUserById).mockResolvedValue({_id: userId, email: "mock@gmail", friends:[friendId.toString()], name:"mocked", password:"123456789"})

        const chat = [userId.toString(), friendId.toString()].sort().join("-")

        await service.getMessage(userId.toString(), friendId.toString())

        expect(findUserById).toHaveBeenCalledWith(userId.toString())
        expect(getMessagesRepository).toHaveBeenCalledWith(chat)
    })

    it("did not find user", async () => {
        vi.mocked(findUserById).mockResolvedValue(null)

        await expect(service.getMessage(userId.toString(), friendId.toString())).rejects.toThrow("no user")
        expect(findUserById).toHaveBeenCalledWith(userId.toString())
        expect(getMessagesRepository).not.toHaveBeenCalled()
    })

    it("are not friends", async () => {
        vi.mocked(findUserById).mockResolvedValue({_id: userId, email: "mock@gmail", friends:[new ObjectId().toString()], name:"mocked", password:"123456789"})

        await expect(service.getMessage(userId.toString(), friendId.toString())).rejects.toThrow("are not friends")

        expect(findUserById).toHaveBeenCalledWith(userId.toString())
        expect(getMessagesRepository).not.toHaveBeenCalled()
    })
})