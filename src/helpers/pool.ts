import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
await client.connect()
console.log("mongodb conectado")
export const myDb = client.db("mydb")