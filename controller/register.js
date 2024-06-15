import { passport } from "../database/DBINIT.js";
import bcrypt from "bcrypt";

const queryTableUser = `
    INSERT INTO users(email, username, password)
    VALUES($1,$2,$3) RETURNING *
`;

const checkUsername = `
    SELECT username FROM users WHERE username = $1
`;

const checkEmail = `
    SELECT email FROM users WHERE email = $1
`;

const register = async (req,res) => {
    try{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        console.log("amin1");
        // check username, email and password must fill
        if(!email || !username || !password){
            return res.status(404).json({
                message: "email, username and password cannot empty"
            })
        };
        console.log("amin2");
        // check email valid or not
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = regexEmail.test(email);
        if(!isEmail){
            return res.status(404).json({
                message: "email invalid"
            })
        };
        console.log("amin3");
        // check email exist or not
        const isEmailExist = await passport.query(checkEmail, [email]);
        if(isEmailExist.rows.length > 0){
            return res.status(404).json({
                message: "email already exist"
            })
        }
        console.log("amin4");
        // check username exist or not
        const isUsername = await passport.query(checkUsername, [username]);
        if(isUsername.rows.length > 0){
            return res.status(404).json({
                message: "username already exist"
            })
        };
        console.log("amin5");
        // change password to hash
        const saltRounds = 12;
        const hash = bcrypt.genSaltSync(saltRounds);
        const hashedPwd = bcrypt.hashSync(password, hash);

        const data = await passport.query(queryTableUser, [email, username, hashedPwd]);
        const details = data.rows[0];

        res.status(201).json({
            message: "register success"
        })
        console.log("register success")
    } catch(err){
        res.status(404).json({
            message: "cannot register"
        })
        console.log("cannot register")
    }
}

export default register;