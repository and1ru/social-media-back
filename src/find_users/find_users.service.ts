import { findUsers } from "./find_users.repository.ts"

export class FindUsersService {
    findUsers = async (name:string) => {
        return await findUsers(name)
    }
}