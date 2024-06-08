import { passport } from "../database/DBINIT.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {secretKey} from "../utils/libs.js";

const queryLogin =  `
    SELECT * FROM users WHERE username = $1
`;

const login = async (req,res) => {
    try{

        
        const username = req.body.username;
        const password = req.body.password;

        // check if username and password is provided
        if(!username || !password){
            return res.status(201).json({
                message: "username and password must fill"
            })
        };
       
        // check if username exist or not
        const data1 = await passport.query(queryLogin, [username]);
        const pwd = data1.rows[0];
        if(!pwd){
            return res.status(404).json({
                message: "username not exist"
            })
        };
        
        // check password correct or not
        const isPwd = bcrypt.compareSync(password, pwd.password);
        if(!isPwd){
            return res.status(404).json({
                message: "password wrong"
            })
        };

        // create token
        const dataToken = {
            id: pwd.id,
            username: pwd.username,
            email: pwd.email
        };

        // const {secretKey} = tools;
        const token = jwt.sign(dataToken, secretKey);
        
        res.status(201).json({
            message: "success login",
            token: token
        })
        console.log("success login");
        
    } catch(err){
        res.status(404).json({
            message: "failed login"
        })
    }
}

export default login;