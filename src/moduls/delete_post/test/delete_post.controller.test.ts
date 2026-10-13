import { DeletePostController } from "../delete_post.controller";
import { DeletePostService } from "../delete_post.service";
import { describe, expect, vi, it, beforeEach } from "vitest";
import type { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongodb";

describe("Controller DELETE /post/:postId", () => {
    let service: DeletePostService
    let controller: DeletePostController
    let res: Response
    let next: NextFunction

    beforeEach(() => {
        service = {
            deletePost: vi.fn()
        }

        controller = new DeletePostController(service)

        next = vi.fn()

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response
    })

    it("post deleted", async () => {
        const req = {
            params: {
                postId: new ObjectId().toString()
            },
            user: {
                id: "mocked userId"
            }
        }as unknown as Request

        await controller.deletePost(req, res, next)

        expect(service.deletePost).toHaveBeenCalledWith(req.params.postId, req.user.id)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "post deleted", success: true })
        expect(next).not.toHaveBeenCalled()
    })

    it("postId is required", async () => {
        const req = {
            params:{},
            user: {
                id: "mocked userId"
            }
        } as Request

        await controller.deletePost(req, res, next)

        expect(service.deletePost).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({"message": "error with postId","success": false,})
        expect(next).not.toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            params: {
                postId: new ObjectId().toString()
            },
            user: {
                id: "mocked userId"
            }
        } as unknown as Request

        const error = new Error()
        vi.mocked(service.deletePost).mockRejectedValue(error)
        await controller.deletePost(req, res, next)

        expect(service.deletePost).toHaveBeenCalledWith(req.params.postId, req.user.id)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})