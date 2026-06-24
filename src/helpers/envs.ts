import dotenv from 'dotenv'
dotenv.config()

export const envs = {
    jwt_secret: process.env.JWT_SECRET!,
    db_url: process.env.DB_URL!,
    db_collection: process.env.DB_COLLECTION!
}