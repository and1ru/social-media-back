import { ObjectId } from "mongodb";
import { CustomError } from "../../helpers/customError.ts";
import { getMessagesRepository } from "./get_message.repository.ts";
import { findUser } from "../friends/friends.repository.ts";

export class GetMessagesService {
  getMessage = async (userId: string, friendId: string) => {
    const user = await findUser(userId);
    if (!user) {
      throw new CustomError("no se encontro un usuario con ese id", 400);
    }

    const friends: ObjectId[] = user.friends;

    // verificar que el friendId este en el array de amigos
    const verify = friends.some((friend) => friend.toString() === friendId);

    // si no esta lanza un error de que no son amigos
    if (!verify) {
      throw new CustomError("no son amigos", 400);
    }

    // si esta hacer un sort con los ids para encontrar el chat y sus mensajes
    const chat = [userId, friendId].sort().join("-");
    return await getMessagesRepository(chat);
  };
}
