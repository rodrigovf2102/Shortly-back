import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const {Pool} = pg;

/*const connection = new Pool({
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE
})*/

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const connection = new Pool(databaseConfig)

export default connection;