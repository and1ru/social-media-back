import { compareHash } from "../../helpers/compareHash.ts";
import { CustomError } from "../../helpers/customError.ts";
import { generarToken } from "../../helpers/generateToken.ts";
import { findUserByEmail } from "../../shared/repositories/findUser/findUser.repository.ts";

export class LoginService {
  login = async (email:string, password:string) => {
    // obtiene el usuario
    const user = await findUserByEmail(email);
    if (!user) {
      throw new CustomError("no user", 400);
    }

    // comparar la contraseña con el hash
    const comapre = await compareHash(password, user.password);
    if (!comapre) {
      throw new CustomError("passwords did not match", 400);
    }

    const userToken = {
      // convierte el ObjectId a un string
      id: user._id.toString(),
      name: user.name,
    };

    // generar el token
    return generarToken(userToken);
  };
}