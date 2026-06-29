import { findUser } from "./login.repository.ts";
import { type loginType } from "./login.schema.ts";
import { compareHash } from "../helpers/compareHash.ts";
import { CustomError } from "../helpers/custom-error.ts";
import { generarToken } from "../helpers/generarToken.ts";

export class LoginService {
  login = async (user: loginType) => {
    // obtiene el usuario
    const result = await findUser(user.email);
    if (!result) {
      throw new CustomError("no se encontro un usuario con ese email",400);
    }

    // comparar la contraseña con el hash
    const comapre = await compareHash(user.password, result.password);
    if (!comapre) {
      throw new CustomError("contraseñas no coinciden",400);
    }

    const userToken = {
      // convierte el ObjectId a un string
      id: result._id.toString(),
      name: result.name
    }

    // generar el token
    const token = generarToken(userToken)
    return token;
  };
}
