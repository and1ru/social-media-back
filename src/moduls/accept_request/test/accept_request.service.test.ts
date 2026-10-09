import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AcceptRequestService } from '../accept_request.service'
import { addFriends } from '../accept_request.repository'
import { findRequestById } from '../../../shared/repositories/findRequest.repository'
import { ObjectId } from 'mongodb'

vi.mock("../../../shared/repositories/findRequest.repository")
vi.mock("../accept_request.repository")

describe("Service PUT /accept-request", () => {
    let service:AcceptRequestService
    const id = "mocked id"

    beforeEach(() => {
        service = new AcceptRequestService()
    })

    it("request accepted", async () => {
        vi.mocked(findRequestById).mockResolvedValue({_id: new ObjectId()})
        vi.mocked(addFriends)

        await service.acceptRequest(id)

        expect(findRequestById).toHaveBeenCalledWith(id)
        expect(addFriends).toHaveBeenCalled()
    })

    it("did not find request", async () => {
        vi.mocked(findRequestById).mockResolvedValue(null)

        await expect(service.acceptRequest("mocked id")).rejects.toThrow("no request")
        expect(findRequestById).toHaveBeenCalledWith(id)
        expect(addFriends).not.toHaveBeenCalled()
    })
})