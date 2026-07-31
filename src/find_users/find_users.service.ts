import { findUsers } from "./find_users.repository.ts"

export class FindUsersService {
    findUsers = async (name:string) => {
        // solo retornar los usuarios que tengan el mismo nombre
        // que no aparezca el mismo usuario
        return await findUsers(name)
    }
}