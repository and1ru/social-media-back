import { CustomError } from "../../helpers/customError.ts";
import { findRequest } from "../../shared/repositories/findRequest.repository.ts";
import { findUserById } from "../../shared/repositories/findUser.repository.ts";
import { sendRequest } from "./send_request.repository.ts";

export class SendRequestService {
  sendRequest = async (receiver: string, sender: string, userName: string) => {
    // verificar que no se envie la solicitud asi mismo
    if (receiver === sender) {
      throw new CustomError(
        "you cannot send a friend request to yourself",
        400,
      );
    }

    // verificar si son amigos
    // 1. obtiene el usuario
    const user = await findUserById(sender);

    // 2. si no existe el usuario lo retorna
    if (!user) {
      throw new CustomError("user no found", 404);
    }

    // 3. obtiene los amigos del usuario
    const friends = user.friends;

    // 4. busca si en el array de amigos existe un amigo con el mismo id que al que le estoy enviando la solicitud
    // some retorna true / false
    const filtrar = friends.some((friend: any) => {
      return friend.toString() === receiver;
    });

    // si encontro el usuario decir que ya son amigos
    if (filtrar) {
      throw new CustomError("both are friends", 400);
    }

    // verificar si la solicitud ya fue enviada
    // 1. obtiene la request
    const verifyRequest = await findRequest(receiver, sender);

    // 2. si hay algo retornar un error
    if (verifyRequest) {
      throw new CustomError("ya se ha enviado la peticion", 400);
    }

    const newRequest = {
      userName,
      receiver,
      sender,
      createdAt: new Date(),
      status: "pending",
    };

    await sendRequest(newRequest);
  };
}
