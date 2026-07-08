import type { Server } from "socket.io";
import { myDb } from "../helpers/pool.ts";

interface Chat {
  _id: string;
  participants: number[];
  createdAt?: Date;
}

export function chatFriend(io: Server) {
  io.on("connection", (socket) => {
    console.log(`se conecto: ${socket.data.userId}`);

    socket.on("join-chat", (data) => {
      // debe de agregar una opcion para verificar que en realidad son amigos
      const room = [socket.data.userId, data.friendId].sort((a, b) => a - b).join("-")
      console.log(`la room es: ${room}`)
      socket.join(room)
    })

    socket.on("send-message", async (data) => {
      const room = [socket.data.userId, data.friendId].sort((a, b) => a - b).join("-")

      const newMessage = {
        senderId: socket.data.userId,
        message: data.message,
        createAt: new Date()
      }

      console.log(newMessage)

      // este mensaje tiene que ser guardado en la base de datos
      const chat = await myDb.collection<Chat>("chats").findOne({_id: room})

      if(!chat){
        await myDb.collection<Chat>("chats").insertOne({_id: room, participants:[socket.data.userId, data.friendId]})
      }

      await myDb.collection("messages").insertOne({...newMessage, chatId: chat?._id})

      console.log(chat)

      io.to(room).emit("receive-message", newMessage)
    })

    socket.on("disconnect", () => {
      console.log("se desconecto el usuario");
    });
  });
}