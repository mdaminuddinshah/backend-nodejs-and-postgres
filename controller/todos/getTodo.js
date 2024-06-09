import { passport } from "../../database/DBINIT.js";

const queryDB = `
    SELECT id, todos, user_id FROM todos WHERE user_id = $1
`;

const getTodos = async (req,res) => {
    try{
        const user_id = req.id;

        const data = await passport.query(queryDB, [user_id]);
        console.log(data)
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