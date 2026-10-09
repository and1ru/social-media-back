import dotenv from 'dotenv'
dotenv.config()

export const envs = {
    jwt_secret: process.env.JWT_SECRET!,
    db_url: process.env.DB_URL!,
    db_url_test: process.env.DB_URL_TEST!,
    node_env: process.env.NODE_ENV!
}