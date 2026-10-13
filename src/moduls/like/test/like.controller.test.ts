import { describe, expect, vi, it, beforeEach } from "vitest";
import { LikesController } from "../like.controller";
import { LikesService } from "../like.service";
import type { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

describe("Controller POST /like/:postId", () => {
    let service: LikesService
    let controller: LikesController
    let res: Response
    let next: NextFunction
    const postId = new ObjectId().toString()

    beforeEach(() => { 
        service = {
            likes: vi.fn()
        }

        controller = new LikesController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as Response

        next = vi.fn()
    })

    it("got likes", async () => {
        const req = {
            params: { postId },
            user:{
                id: postId.toString()
            }
        } as Request

        vi.mocked(service.likes).mockResolvedValue({ liked:false, likes:10})

        await controller.likes(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message:"se dio o se quito el like", success:true, liked: false, likes:10 })
        expect(service.likes).toHaveBeenCalledWith(postId, req.user.id)
        expect(next).not.toHaveBeenCalled()
    })

    it("postId is required", async () => {
        const req = {
            params: {},
            user:{
                id: postId.toString()
            }
        } as Request

        await controller.likes(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message:"postId is required", success:false })
        expect(service.likes).not.toHaveBeenCalled()
        expect(next).not.toHaveBeenCalled()
    })
})