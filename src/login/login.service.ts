import { findUser } from "./login.repository.ts";
import { type loginType } from "./login.schema.ts";
import { compareHash } from "../helpers/compareHash.ts";
import { CustomError } from "../helpers/custom-error.ts";

export class LoginService {
  login = async (user: loginType) => {
    // verificar que el email exista
    const result = await findUser(user.email);
    if (!result) {
      throw new CustomError("no se encontro un usuario con ese email",400);
    }
    // comparar los hash
    const comapre = await compareHash(user.password, result.password);
    if (!comapre) {
      throw new CustomError("contraseñas no coinciden",400);
    }
    // retornar el usuario
    return result;
  };
}
