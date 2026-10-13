import { describe, expect, vi, it, beforeEach } from "vitest";
import type { RejectRequestService } from "../reject_request.service";
import { RejectRequestController } from "../reject_request.controller";
import { type NextFunction, type Response, type Request, request } from "express";
import { ObjectId } from "mongodb";

vi.mock("../reject_request.repository")
vi.mock("../../../shared/repositories/findRequest.repository")

describe("Controller PUT /reject-request", () => {
    let service: RejectRequestService
    let controller: RejectRequestController
    let next: NextFunction
    let res: Response
    const userId = new ObjectId()
    const requestId = new ObjectId()

    beforeEach(() => {
        service = {
            rejectRequest: vi.fn()
        }

        controller = new RejectRequestController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn()
    })

    it("request rejected", async () => {
        const req = {
            body: {
                id: requestId.toString()
            },
            user: {
                id:userId.toString()
            }
        } as Request

        await controller.rejectRequest(req, res, next)

        expect(service.rejectRequest).toHaveBeenCalledWith(requestId.toString(), userId.toString())
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:"request rejected", success:true})
        expect(next).not.toHaveBeenCalled()

    })

    it("requestId is required", async () => {
        const req = {
            body: {},
            user: {
                id:userId.toString()
            }
        } as Request

        await controller.rejectRequest(req, res, next)

        expect(service.rejectRequest).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            body: {
                id: requestId.toString()
            },
            user: {
                id:userId.toString()
            }
        } as Request

        const error = new Error()
        vi.mocked(service.rejectRequest).mockRejectedValue(error)

        await controller.rejectRequest(req, res, next)

        expect(service.rejectRequest).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})