import type { NextFunction, Request, Response } from "express"

const request = new Map()

export const rateLimit = (tries: number, windowTime: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // obtenemos el ip del usuario
        const ip = req.ip
        // obtenemos el momento en que se hizo la peticion
        const now = Date.now()

        // obtenemos el objeto donde esta cuantas veces se ha hecho la peticion y el tiempo
        const data = request.get(ip)

        // si no retorna nada es porque no se ha intentado ni 1 vez
        // entonces inserta el nuevo valor y sale
        if (!data) {
            request.set(ip, { count: 1, setTime: now })
            return next()
        }

        // tiempo transcurrido
        const elapsedTime = now - data.setTime

        // aqui dice cuanto tiempo debe pasar para reiniciar el contador
        // si el tiempo que ha pasado es mayor o igual tiempo permitido entonces se reinicia el contador
        if (elapsedTime >= windowTime) {
            request.set(ip, { count: 1, setTime: now })
            return next()
        }

        // si el numero de intentos es mayor al permitido entonces lanza un error
        if (data.count >= tries) {
            return res.status(429).json({ message: "too many request, try again later", success: false })
        }

        // aumenta el valor del contador y va a la siguiente
        data.count++
        next()
    }
}