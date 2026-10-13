import { describe, expect, vi, it, beforeEach } from "vitest";
import { rejectRequest } from "../reject_request.repository";
import { findRequestById } from "../../../shared/repositories/findRequest/findRequest.repository";
import { RejectRequestService } from "../reject_request.service";
import { ObjectId } from "mongodb";

vi.mock("../../../shared/repositories/findRequest/findRequest.repository")
vi.mock("../reject_request.repository")

describe("Controller PUT /reject-request", () => {
    let service: RejectRequestService
    const requestId = new ObjectId()
    const userId = new ObjectId().toString()

    beforeEach(() => {
        service = new RejectRequestService()
    })

    it("request rejected", async () => {
        vi.mocked(findRequestById).mockResolvedValue({ _id: requestId, createdAt: "", receiver:userId, sender:"", status: "", userName: "" })
        vi.mocked(rejectRequest)

        await service.rejectRequest(requestId.toString(), userId)

        expect(findRequestById).toHaveBeenCalledWith(requestId.toString())
        expect(rejectRequest).toHaveBeenCalledWith(requestId.toString())
    })

    it("did not find request", async () => {
        vi.mocked(findRequestById).mockResolvedValue(null)

        await expect(service.rejectRequest(requestId.toString(), userId)).rejects.toThrow("no request")

        expect(findRequestById).toHaveBeenCalledWith(requestId.toString())
        expect(rejectRequest).not.toHaveBeenCalled()
    })

    it("user cannot reject request", async () => {
        vi.mocked(findRequestById).mockResolvedValue({ _id: requestId, createdAt: "", receiver:new ObjectId().toString(), sender:"", status: "", userName: "" })

        await expect(service.rejectRequest(requestId.toString(), userId)).rejects.toThrow("you can not reject this request")

        expect(findRequestById).toHaveBeenCalledWith(requestId.toString())
        expect(rejectRequest).not.toHaveBeenCalled()
    })
})