import type { Server } from "socket.io";
import { myDb } from "../../helpers/pool.ts";

interface Chat {
  _id: string;
  participants: number[];
  createdAt?: Date;
}

export function chatFriend(io: Server) {
  io.on("connection", (socket) => {

    socket.on("join-chat", (data) => {
      // debe de agregar una opcion para verificar que en realidad son amigos
      const room = [socket.data.userId, data.friendId].sort().join("-")
      socket.join(room)
    })

    socket.on("leave-room", (data) => {
      const room = [socket.data.userId, data.friendId].sort().join("-")
      socket.leave(room)
    })
    
    socket.on("send-message", async (data) => {
      const date = new Date()

      const room = [socket.data.userId, data.friendId].sort().join("-")

      const newMessage = {
        senderId: socket.data.userId,
        message: data.message,
        createAt: `${date.getHours()}:${date.getMinutes()}`
      }

      // este mensaje tiene que ser guardado en la base de datos
      const chat = await myDb.collection<Chat>("chats").findOne({_id: room})

      if(!chat){
        await myDb.collection<Chat>("chats").insertOne({_id: room, participants:[socket.data.userId, data.friendId]})
      }

      await myDb.collection("messages").insertOne({...newMessage, chatId: room})

      io.to(room).emit("receive-message", newMessage)
      // socket.emit("receive-message", newMessage)
    })

    socket.on("disconnect", () => {
    });
  });
}