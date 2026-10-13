import { describe, expect, vi, it, beforeEach } from "vitest";
import { RegisterService } from "../register.service";
import { findUserByEmail } from "../../../shared/repositories/findUser/findUser.repository";
import { registerRepository } from "../register.repository";
import { ObjectId } from "mongodb";

vi.mock("../../../shared/repositories/findUser/findUser.repository")
vi.mock("../register.repository")

describe("Service POST /register", () => {
    let service: RegisterService
    const name = "mocked name"
    const password = "123456789"
    const email = "mocked@gmail.com"

    beforeEach(() => {
        service = new RegisterService()  
    })

    it("user created", async () => {
        vi.mocked(findUserByEmail).mockResolvedValue(null)
        
        await service.register({name, email, password})

        expect(findUserByEmail).toHaveBeenCalledWith(email)
        expect(registerRepository).toHaveBeenCalled()
    })

    it("user already exist", async () => {
        vi.mocked(findUserByEmail).mockResolvedValue({_id: new ObjectId(), email, friends: [], name, password})

        await expect(service.register({name, email, password})).rejects.toThrow("email is used")
        expect(registerRepository).not.toHaveBeenCalled()
    })
})