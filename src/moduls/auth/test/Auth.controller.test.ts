import { describe, expect, it, vi } from 'vitest'
import type { Response, Request } from 'express'
import { AuthController } from '../Auth.controller'

describe("Controller GET /me", () => {
    it("success auth", () => {
        const req = {
            user: {
                id: "mocked id",
                name: "mocked name"
            }
        } as Request

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        const controller = new AuthController()

        controller.auth(req, res)

        const result = {
            name: req.user.name,
            userId: req.user.id
        }

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ success: true, message: "authenticated", result })
    })
})