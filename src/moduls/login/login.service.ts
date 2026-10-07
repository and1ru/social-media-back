import { type loginType } from "./login.schema.ts";
import { compareHash } from "../../helpers/compareHash.ts";
import { CustomError } from "../../helpers/customError.ts";
import { generarToken } from "../../helpers/generateToken.ts";
import { findUserByEmail } from "../../shared/repositories/findUser.repository.ts";

export class LoginService {
  login = async (user: loginType) => {
    // obtiene el usuario
    const result = await findUserByEmail(user.email);
    if (!result) {
      throw new CustomError("no user", 400);
    }

    // comparar la contraseña con el hash
    const comapre = await compareHash(user.password, result.password);
    if (!comapre) {
      throw new CustomError("passwords did not match", 400);
    }

    const userToken = {
      // convierte el ObjectId a un string
      id: result._id.toString(),
      name: result.name,
    };

    // generar el token
    return generarToken(userToken);
  };
}
