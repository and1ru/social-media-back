import { describe, it, vi, expect, beforeEach } from 'vitest'
import { LoginService } from '../login.service'
import { ObjectId } from 'mongodb'
import { compareHash } from '../../../helpers/compareHash'
import { generarToken } from '../../../helpers/generateToken'
import { findUserByEmail } from '../../../shared/repositories/findUser/findUser.repository'

vi.mock("../../../shared/repositories/findUser/findUser.repository")
vi.mock("../../../helpers/compareHash")
vi.mock("../../../helpers/generateToken")

describe("service POST /login", () => {
    let service: LoginService
    beforeEach(() => {
        service = new LoginService()
    })

    it("token generated", async () => {
        vi.mocked(findUserByEmail).mockResolvedValue({
            _id: new ObjectId(),
            email: "andres@gmail.com",
            friends: [],
            name: "andres",
            password: "1234567890"
        })

        vi.mocked(compareHash).mockResolvedValue(true)
        vi.mocked(generarToken).mockReturnValue("token")

        const result = await service.login("andres@gmail.com", "1234567890")

        expect(result).toBe("token")
    })

    it("not found user error", async () => {
        vi.mocked(findUserByEmail).mockResolvedValue(null)

        await expect(service.login("samuel@gmail.com", "1234567890")).rejects.toThrow("no user")
    })

    it("passwords not match", async () => {
        vi.mocked(findUserByEmail).mockResolvedValue({
            _id: new ObjectId(),
            email: "andres@gmail.com",
            friends: [],
            name: "andres",
            password: "1234567890"
        })

        vi.mocked(compareHash).mockResolvedValue(false)

        await expect(service.login("andres@gmail.com", "1234567899")).rejects.toThrow("passwords did not match")
    })
})