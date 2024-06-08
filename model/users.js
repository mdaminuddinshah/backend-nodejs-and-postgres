import { passport } from "../database/DBINIT.js";

const queryTable =  `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
`;

const createTableUser = async () => {
    try{
        await passport.query(queryTable);
        console.log("table created")
    } catch(err){
        console.log("error")
    }
}

export default createTableUser;