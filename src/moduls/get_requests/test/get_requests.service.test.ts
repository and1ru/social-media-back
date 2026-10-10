import { describe, expect, vi, it, beforeEach } from "vitest";
import { GetRequestsService } from "../get_requests.service";
import { getRequestRepository } from "../get_requests.repository";
import { ObjectId } from "mongodb";

vi.mock("../get_requests.repository")

describe("Service GET /get-requests", () => {
    let service: GetRequestsService
    let userId = new ObjectId()
    beforeEach(() => {
        service = new GetRequestsService()
    })

    it("got friend requests", async () => {
        vi.mocked(getRequestRepository).mockResolvedValue([{ _id: new ObjectId()}])

        await service.getRequest(userId.toString())

        expect(getRequestRepository).toHaveBeenCalledWith(userId.toString())
    })
})