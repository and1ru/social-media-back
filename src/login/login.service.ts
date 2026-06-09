import { findUser } from "./login.repository.ts";
import { type loginType } from "./login.schema.ts";
import { compareHash } from "../helpers/compareHash.ts";

export class LoginService {
  login = async (user: loginType) => {
    // verificar que el email exista
    const result = await findUser(user.email);
    if (!result) {
      throw new Error("no se encontro un usuario con ese email");
    }
    // comparar los hash
    const comapre = await compareHash(user.password, result.password);
    if (!comapre) {
      throw new Error("contraseñas no coinciden");
    }
    // retornar el usuario
    return result;
  };
}
