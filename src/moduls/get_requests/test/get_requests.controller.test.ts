import { describe, expect, vi, it, beforeEach } from "vitest";
import { GetRequestsController } from "../get_requests.controller";
import { GetRequestsService } from "../get_requests.service";
import type { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

describe("Controller GET /get-requests", () => {
    let service: GetRequestsService
    let controller: GetRequestsController
    let res: Response
    let next: NextFunction

    beforeEach(() => {
        service = {
            getRequest: vi.fn()
        }

        controller = new GetRequestsController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as Request

        next = vi.fn()
    })

    it("got friends request", async () => {
        const req = {
            user: { id: new ObjectId().toString() }
        } as Request

        const result = [{_id: new ObjectId()}]

        vi.mocked(service.getRequest).mockResolvedValue(result)

        await controller.getRequest(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message:"got friend requests", result, success:true })
        expect(next).not.toHaveBeenCalled()

    })
})