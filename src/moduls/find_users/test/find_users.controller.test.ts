import { describe, expect, vi, it, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { FindUsersController } from "../find_users.controller";
import { FindUsersService } from "../find_users.service";
import { ObjectId } from "mongodb";

describe("Controller GET /find-users", () => {
    let service: FindUsersService
    let res: Response
    let next: NextFunction
    let controller: FindUsersController

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as Response

        next = vi.fn()

        service = {
            findUsers: vi.fn()
        }

        controller = new FindUsersController(service)
    })

    it("found users", async () => {
        const req = {
            params: {
                name: "mocked name"
            },
            user: {
                id: "mocked userId"
            }
        } as Request

        const result = [{ id: new ObjectId(), name: "mocked name", relation: "mocked relation" }]

        vi.mocked(service.findUsers).mockResolvedValue(result)

        await controller.findUsers(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "got users by name", success: true, result })
        expect(next).not.toHaveBeenCalled()
    })

    it("name is required", async () => {
        const req = {
            params: {},
            user: {
                id: "mocked userId"
            }
        } as Request

        await controller.findUsers(req, res, next)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            params: {
                name: "mocked name"
            },
            user: {
                id: "mocked userId"
            }
        } as Request

        const error = new Error()
        vi.mocked(service.findUsers).mockRejectedValue(error)

        await controller.findUsers(req, res, next)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})