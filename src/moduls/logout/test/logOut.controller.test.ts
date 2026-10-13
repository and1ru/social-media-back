import { describe, expect, vi, it } from "vitest";
import type { Request, Response } from "express";
import { LogOutController } from "../logOut.controller";

describe("Controller POST /log-out", () => {
    it("loged out", async () => {
        const req = {} as Request
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            clearCookie: vi.fn()
        } as unknown as Response

        const controller = new LogOutController()

        controller.logOut(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.clearCookie).toHaveBeenCalledWith("token", {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          secure: false
        })
        expect(res.json).toHaveBeenCalledWith({status:true, message:"loged out"})
    })
})