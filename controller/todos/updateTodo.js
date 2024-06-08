import { passport } from "../../database/DBINIT.js";

const queryTodo =  `
    UPDATE todos
    SET todos = $1
    WHERE id = $2
    RETURNING *
`;

const updateTodo = async (req,res) => {
    try{

        const text = req.body.todos;
        const id = req.params.id;
        const userId = req.id;

        // check id in table todos exist or not
        const queryCheck = `SELECT id FROM todos WHERE id = $1`;
        const isId = await passport.query(queryCheck, [id]);
        if(!isId.rows.length > 0){
            return res.status(404).json({
                message: `table todos id ${id} not exist`
            })
        };

        // check id to make sure its user_id is correct with id we want to update
        const queryId = `
            SELECT id, user_id FROM todos WHERE id = $1
        ` ;

        const checkId = await passport.query(queryId, [id]);
        const data = checkId.rows[0].user_id;
        console.log(data);

        if(data != userId){
            return res.status(404).json({
                message: "id not match"
            })
        };

        const updateData = await passport.query(queryTodo, [text, id]);
        res.status(201).json({
            message: "success update",
            data: updateData.rows.map((todos) => {
                return {
                    id: todos.id,
                    todos: todos.todos,
                    user_id: todos.user_id
                }
            } )
          
        })

        

        
    } catch(err){
        res.status(404).json({
            message: 'cannot update todo id'
        })
    }
}

export default updateTodo;

