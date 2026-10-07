import { myDb } from "../../helpers/pool.ts";
import type { registerType } from "./register.schema.ts";

export const registerRepository = async (user:registerType) => {
    return await myDb.collection("users").insertOne(user)
}