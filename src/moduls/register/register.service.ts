import { CustomError } from "../../helpers/customError.ts";
import { hashPassword } from "../../helpers/hashPassword.ts";
import { findUserByEmail } from "../../shared/repositories/findUser.repository.ts";
import { registerRepository } from "./register.repository.ts";
import type { registerType } from "./register.schema.ts";

export class RegisterService {
  register = async (user: registerType) => {
    // verificar que no exista el amail
    const result = await findUserByEmail(user.email);
    if (result) {
      throw new CustomError("email existe", 409);
    }

    // hash password
    const hashedPassword = await hashPassword(user.password);
    const newUser = {
      ...user,
      password: hashedPassword,
      friends: [],
    };

    await registerRepository(newUser);
  };
}
