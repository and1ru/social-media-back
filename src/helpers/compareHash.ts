import bcrypt from 'bcrypt'

export async function compareHash(password:string, hashedPassword:string) {
    return bcrypt.compare(password, hashedPassword)
}