import { passport } from "../database/DBINIT.js";

const queryTodo = `
    CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        todos text NOT NULL,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW()
    )
`;

const createTodo = async () => {
    try{
        await passport.query(queryTodo);
        console.log("todos table created");
    } catch(err){
        console.log("cannot create table todos");
    }
};

export default createTodo;