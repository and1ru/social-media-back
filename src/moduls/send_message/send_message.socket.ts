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
      const room = [socket.data.userId, data.friendId].sort().join("-")
      console.log(room)
      socket.join(room)
    })

    socket.on("leave-room", (data) => {
      const room = [socket.data.userId, data.friendId].sort().join("-")
      socket.leave(room)
      console.log(`Socket ${socket.data.userId} salió de la sala: ${room}`);
    })
    
    socket.on("send-message", async (data) => {
      const room = [socket.data.userId, data.friendId].sort().join("-")

      const newMessage = {
        senderId: socket.data.userId,
        message: data.message,
        createAt: new Date()
      }

      console.log(room)
      console.log(newMessage)
      console.log(socket.rooms)

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
      console.log("se desconecto el usuario");
    });
  });
}