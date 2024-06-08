import { passport } from "../../database/DBINIT.js";

const queryTodo = `
    INSERT INTO todos(todos, user_id)
    VALUES($1, $2) RETURNING *
`;

const createText = async (req,res) => {
    try{
        const text = req.body.text;
        const id = req.id;
        const data = await passport.query(queryTodo, [text, id]);
        res.status(201).json({
            message: "Success create text",
            data: data.rows.map((dot) => {
                return {
                    id: dot.id,
                    text: dot.todos,
                    user_id: dot.user_id
                }
            })

        })
    } catch(err){
        res.status(404).json({
            message: "failed, cannot create text"
        })
    }
}

export default createText;