import { hashPassword } from "../helpers/hashPassword.ts";
import { registerRepository, verifyExistEmail } from "./register.repository.ts";
import type { registerType } from "./register.schema.ts";

export class RegisterService {
    register = async (user:registerType) => {
        // verificar que no exista el amail
        const result = await verifyExistEmail(user.email)
        if(result){
            throw new Error("email existe");
        }
        // hash password
        const hashedPassword = await hashPassword(user.password)
        const newUser = {
            ...user,
            password:hashedPassword
        }
        console.log(newUser)
        return registerRepository(newUser)
    }
}