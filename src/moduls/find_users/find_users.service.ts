import { CustomError } from "../../helpers/customError.ts";
import { findRequest } from "../../shared/repositories/findRequest/findRequest.repository.ts";
import { findUserById } from "../../shared/repositories/findUser/findUser.repository.ts";
import { findUsers } from "./find_users.repository.ts";

export class FindUsersService {
  findUsers = async (name: string, userId: string) => {
    const me = await findUserById(userId);
    if (!me) {
      throw new CustomError("user not found", 404);
    }

    // busca usuarios con el name y excluyendose para no aparecer el mismo
    const users = await findUsers(name, userId);
    const result = [];

    for (const user of users) {
      let relation = "none";
      // verifica si el usuario que hace la peticion tiene como amigo a el usuario que aparece como respuest
      const isFriend = me.friends.some(
        (friendId) => friendId.toString() === user._id.toString(),
      );
      // si el usuario aparece dentro del array de amigos entonces el status es friends
      if (isFriend) {
        relation = "friend";
      } else {
        // verifica si yo envie la solicitud
        const requestSend = await findRequest(
          me._id.toString(),
          user._id.toString(),
        );
        // si yo fui quien envio la solicitud y no ha sido aceptada ni rechazada entonces la situacion es pendding
        if (requestSend) {
          relation = "pendding_sent";
        } else {
          // verifica si me envio la solicitud de amistad
          const requestResived = await findRequest(
            user._id.toString(),
            me._id.toString(),
          );
          // si fui yo a quien le envio la solicitud
          if (requestResived) {
            relation = "pendding_received";
          }
        }
      }
      // inserta el usuario y el estado
      result.push({ id: user._id.toString(), name: user.name, relation });
    }

    return result;
  };
}
