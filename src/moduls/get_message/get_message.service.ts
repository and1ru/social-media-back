import { CustomError } from "../../helpers/customError.ts";
import { getMessagesRepository } from "./get_message.repository.ts";
import { findUserById } from "../../shared/repositories/findUser/findUser.repository.ts";

export class GetMessagesService {
  getMessage = async (userId: string, friendId: string) => {
    const user = await findUserById(userId);
    if (!user) {
      throw new CustomError("no user", 404);
    }

    const friends = user.friends;

    // verificar que el friendId este en el array de amigos
    const verify = friends.some((friend) => friend.toString() === friendId);

    // si no esta lanza un error de que no son amigos
    if (!verify) {
      throw new CustomError("are not friends", 400);
    }

    // si esta hacer un sort con los ids para encontrar el chat y sus mensajes
    const chat = [userId, friendId].sort().join("-");
    const result = await getMessagesRepository(chat);
    console.log(result)
    return result
  };
}
