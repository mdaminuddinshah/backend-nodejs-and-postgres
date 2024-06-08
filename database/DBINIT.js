import pg from "pg";
import "dotenv/config";
import createTableUser from "../model/users.js";
import createTodo from "../model/todos.js";

const {Pool} = pg;

export const passport  = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    max: 20,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000
});

const connectDB = async () => {
    try{
        await passport.query("SELECT NOW()");
        console.log("Connected DB");

        createTableUser();
        createTodo();
    } catch(err){
        console.log("Error cant connect");
    }
}

export default connectDB;