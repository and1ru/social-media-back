import { describe, expect, vi, it, beforeEach } from "vitest";
import type { GetMessagesService } from "../get_message.service";
import { GetMessagesController } from "../get_message.controller";
import type { NextFunction, Response, Request } from "express";

describe("Controller GET /get-messages/:friendId", () => {
    let service: GetMessagesService
    let controller: GetMessagesController
    let res: Response
    let next: NextFunction
    let friendId = "mocked friendId"

    beforeEach(() => {
        service = {
            getMessage: vi.fn()
        }

        controller = new GetMessagesController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn
    })

    it("got messages", async () => {
        const req = {
            params: { friendId },
            user: { id: "mocked userId", name: "mocked userName"}
        } as unknown as Request

        const result = [{_id: "mocked message"}]

        vi.mocked(service.getMessage).mockResolvedValue(result)

        await controller.getMessage(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:"got messages", success:false, result})
    })

    it("friendId is required", async () => {
        const req = {
            params: {},
            user: {}
        } as Request

        await controller.getMessage(req, res, next)

        expect(service.getMessage).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({message:"error with friendId", success:false})
    })

    it("service error", async () => {
        const req = {
            params: { friendId },
            user: { id: "mocked userId", name: "mocked userName" }
        } as unknown as Request

        const error = new Error()
        vi.mocked(service.getMessage).mockRejectedValue(error)
        await controller.getMessage(req, res, next)

        expect(service.getMessage).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
    })
})