import { passport } from "../../database/DBINIT.js";

const queryDB = `
    SELECT id, todos FROM todos
`;

const getTodos = async (req,res) => {
    try{
        const data = await passport.query(queryDB);
        res.status(201).json({
            message: data.rows
        })
    } catch(err){
        res.status(404).json({
            message: "cannot get todos"
        })
    }
} 

export default getTodos;