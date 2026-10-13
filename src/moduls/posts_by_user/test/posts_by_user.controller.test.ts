import { describe, expect, vi, it, beforeEach } from "vitest";
import { PostsByUserController } from "../posts_by_user.controller";
import { PostsByUserService } from "../posts_by_user.service";
import type { NextFunction, Response, Request } from "express";
import { ObjectId } from "mongodb";

describe("Controller POST /post-user/:userId", () => {
    let service: PostsByUserService
    let controller: PostsByUserController
    let res: Response
    let next: NextFunction
    const userId = new ObjectId().toString()

    beforeEach(() => {
        service = {
            postByUser: vi.fn()
        }
        controller = new PostsByUserController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response
        next = vi.fn()
    })

    it("got posts by userId", async () => {
        const req = {
            params: { userId }
        } as unknown as Request

        const result = [{_id: new ObjectId()}]

        vi.mocked(service.postByUser).mockResolvedValue(result)

        await controller.postByUser(req, res, next)

        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith({ message: "got post by userId", success:true, result })
        expect(service.postByUser).toHaveBeenCalledWith(userId)
        expect(next).not.toHaveBeenCalled()
    })

    it("userId is required", async () => {
        const req = {
            params: {}
        } as Request

        await controller.postByUser(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "error with userId", success: false })
        expect(service.postByUser).not.toHaveBeenCalled()
        expect(next).not.toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            params: { userId }
        } as unknown as Request

        const error = new Error()
        vi.mocked(service.postByUser).mockRejectedValue(error)

        await controller.postByUser(req, res, next)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(service.postByUser).toHaveBeenCalledWith(userId)
        expect(next).toHaveBeenCalled()
    })
})