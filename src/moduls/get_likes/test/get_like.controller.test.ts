import { describe, expect, vi, it, beforeEach } from "vitest";
import type { GetLikesService } from "../get_like.service";
import { GetLikesController } from "../get_like.controller";
import type { NextFunction, Response, Request } from "express";

describe("Controller GET /like/:postId", () => {
    let service: GetLikesService
    let controller: GetLikesController
    let res: Response
    let next: NextFunction

    beforeEach(() => {
        service = {
            likes: vi.fn()
        }

        controller = new GetLikesController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn()
    })

    it("got likes", async () => {
        const req = {
            params:{ postId: "mocked postId" },
            user: {
                id: "mocked userId",
                name: "mocked userName"
            }
        } as unknown as Request

        const result = {liked:true, likes:4}

        vi.mocked(service.likes).mockResolvedValue(result)

        await controller.likes(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "got likes", liked:true, likes:4 })
        expect(service.likes).toHaveBeenCalledWith(req.params.postId, req.user.id)
    })

    it("postId is required", async () => {
        const req = {
            params:{},
            user: {
                id: "mocked userId",
                name: "mocked userName"
            }
        } as Request

        await controller.likes(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({message:"error with postId", success:false})
        expect(service.likes).not.toHaveBeenCalled()
    })
})