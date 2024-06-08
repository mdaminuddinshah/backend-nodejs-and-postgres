import { passport } from "../database/DBINIT.js";

const queryData =  `
    SELECT * FROM users
`;

const getData = async (req,res) => {
    try{
        const data = await passport.query(queryData);
        const details = data.rows.map((id) => {return {
            id : id.id,
            username : id.username,
            email : id.email
        }})
        res.status(201).json({
            message: "all data here",
            data: details
        })
    } catch(err){
        res.status(404).json({
            message: "cannot query"
        })
        console.log("cannot query")
    }
}

export default getData;
