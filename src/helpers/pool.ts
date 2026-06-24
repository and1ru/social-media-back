import { MongoClient } from "mongodb";
import { envs } from "./envs.ts";
const url = envs.db_url
const client = new MongoClient(url)
await client.connect()
console.log("mongodb conectado")
export const myDb = client.db(envs.db_collection)