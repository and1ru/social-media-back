import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AcceptRequestService } from '../accept_request.service'
import { addFriends } from '../accept_request.repository'
import { ObjectId } from 'mongodb'
import { findRequestById } from '../../../shared/repositories/findRequest/findRequest.repository'

vi.mock("../../../shared/repositories/findRequest/findRequest.repository")
vi.mock("../accept_request.repository")

describe("Service PUT /accept-request", () => {
    let service:AcceptRequestService
    const id = new ObjectId()
    const senderId = new ObjectId()
    const receiverId = new ObjectId()

    beforeEach(() => {
        service = new AcceptRequestService()
    })

    it("request accepted", async () => {
        vi.mocked(findRequestById).mockResolvedValue({_id: new ObjectId(), createdAt: "", receiver: receiverId.toString(), sender: senderId.toString(), status: "", userName: ""})
        vi.mocked(addFriends)

        await service.acceptRequest(id.toString())

        expect(findRequestById).toHaveBeenCalledWith(id.toString())
        expect(addFriends).toHaveBeenCalledWith(receiverId, senderId, id.toString())
    })

    it("did not find request", async () => {
        vi.mocked(findRequestById).mockResolvedValue(null)

        await expect(service.acceptRequest(id.toString())).rejects.toThrow("no request")
        expect(findRequestById).toHaveBeenCalledWith(id.toString())
        expect(addFriends).not.toHaveBeenCalled()
    })
})