import { describe, expect, vi, it } from "vitest";
import type { SendRequestService } from "../send_request.service";
import type { SendRequestController } from "../send_request.controller";
import type { NextFunction, Request, Response } from "express";

describe("Controller POST /send-request", () => {
    let service: SendRequestService
    let controller: SendRequestController
    let res: Response
    let next: NextFunction

    it("request sent", async () => {

    })

    it("receiver is required", async () => {

    })

    it("service error", async () => {

    })
})