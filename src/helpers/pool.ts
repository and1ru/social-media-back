import { MongoClient } from "mongodb";
import { envs } from "./envs.ts";

const url = envs.node_env === "test" ? envs.db_url_test : envs.db_url
const client = new MongoClient(url)
await client.connect()

console.log("mongodb conectado")
export const myDb = client.db()