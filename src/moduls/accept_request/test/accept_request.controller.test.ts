import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Response, Request, NextFunction } from 'express'
import { AcceptRequestController } from '../accept_request.controller'
import { AcceptRequestService } from '../accept_request.service'

describe("Controller PUT /accept-request", () => {
    let res: Response
    let next: NextFunction
    let service: AcceptRequestService
    let controller: AcceptRequestController

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn()

        service = {
            acceptRequest: vi.fn()    
        }

        controller = new AcceptRequestController(service)
    })

    it("request accepted", async () => {
        const req = {
            body: {
                id: "1234567890"
            }
        } as Request

        vi.mocked(service.acceptRequest)

        await controller.acceptRequest(req, res, next)

        expect(service.acceptRequest).toHaveBeenCalledWith(req.body.id)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:"request accepted", success:true})
        expect(next).not.toHaveBeenCalled()
    })

    it("id is required", async () => {
        const req = {
            body: {}
        } as Request

        vi.mocked(service.acceptRequest)

        await controller.acceptRequest(req, res, next)

        expect(next).toHaveBeenCalled()
        expect(service.acceptRequest).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            body: {
                id: "1234567890"
            }
        } as Request

        const error = new Error()
        vi.mocked(service.acceptRequest).mockRejectedValue(error)
        await controller.acceptRequest(req, res, next)

        expect(service.acceptRequest).toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })
})