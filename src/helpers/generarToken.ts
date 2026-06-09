import jwt from 'jsonwebtoken'

interface Payload {
    name: string;
    id: string;
}

export function generarToken({id, name}:Payload) {
    const token = jwt.sign(
        {
            name,
            id
        }, "palabra_secreta"
    )

    return token
}