import { Server } from "socket.io";

const io = new Server(4000, {cors:{origin:"*"}})

io.on("connection", (socket) => {
    console.log(`se conecto un usuario con el id: ${socket.id}`)

    socket.emit("saludo-servidor", {
        message: "te has conectado",
        tuId: socket.id
    })

    socket.on("mensaje-cliente", (data) => {
        console.log(data)
    })

    socket.on("unirser-chat", (nombreSala) => {
        socket.join(nombreSala)
        console.log(`el usuario ${socket.id} se unio a la sala: ${nombreSala}`)
    })

    socket.on("disconnect", () => {
        console.log(`se deconecto el id: ${socket.id}`)
    })
})

console.log("se esta escuchando en el puerto 4000")