import jwt from 'jsonwebtoken'
import { envs } from './envs.ts';

interface Payload {
    name: string;
    id: string;
}

export function generarToken({id, name}:Payload) {
    const token = jwt.sign(
        {
            name,
            id
        }, envs.jwt_secret
    )

    return token
}