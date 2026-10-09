import { generarToken } from "./generateToken"

export const generateTokenTest = () => {
    const token = generarToken({ id: "mocked id", name: "mocked name "})
    return [`token=${token}`]
}