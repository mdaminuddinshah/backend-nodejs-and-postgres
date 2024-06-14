import pg from "pg";
import "dotenv/config";
import createTableUser from "../model/users.js";
import createTodo from "../model/todos.js";

const {Pool} = pg;

export const passport = new Pool({
    connectionString: process.env.DATABASE_URL
    // ssl: {
    //     rejectUnauthorized: false
    // }
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