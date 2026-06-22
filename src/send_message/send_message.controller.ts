import { Server } from "socket.io";

const io = new Server(4000, {cors:{origin:"*"}})

io.on("connection", (socket) => {
    console.log("se conecto")

    // unirse a un chat / sala
    socket.join("joint chat")
    // recibir un mensaje
    socket.on("enviar mensaje", () => {

    })
    // guardar el mensaje en la base de datos
    // enviar los mensajes de la base de datos
    socket.emit("")

    socket.on("disconnect", () => {
        console.log("se desconecto")
    })
})

console.log("se esta escuchando en el puerto 4000")