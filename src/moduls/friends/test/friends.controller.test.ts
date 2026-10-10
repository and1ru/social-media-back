import type { NextFunction, Request, Response } from "express";
import { describe, expect, vi, it, beforeEach } from "vitest";
import type { FriendsService } from "../friends.service";
import { FriendsController } from "../friends.controller";
import { ObjectId } from "mongodb";

describe("Controller GET /friends", () => {
    let service: FriendsService
    let controller: FriendsController
    let res: Response
    let next:NextFunction

    beforeEach(() => {
        service = {
            friends: vi.fn()
        }

        controller = new FriendsController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as Request

        next = vi.fn()
    })

    it("got friends", async () => {
        const req = {
            user: {
                id: "mocked id"
            }
        } as Request

        const result = [{ id: new ObjectId(), name:"mocked friend name"}]

        vi.mocked(service.friends).mockResolvedValue(result)
        await controller.friends(req, res, next)

        expect(service.friends).toHaveBeenCalledWith(req.user.id)
        expect(res.json).toHaveBeenCalledWith({message:"got friends", result, success:true})
        expect(res.status).toHaveBeenCalledWith(200)
        expect(next).not.toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            user: {
                id: "mocked id"
            }
        } as Request

        const error = new Error()

        vi.mocked(service.friends).mockRejectedValue(error)
        await controller.friends(req, res, next)

        expect(service.friends).toHaveBeenCalledWith(req.user.id)
        expect(res.json).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})