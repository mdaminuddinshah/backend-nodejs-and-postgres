import jwt from "jsonwebtoken";
import { secretKey } from "../utils/libs.js";

const middleware = (req,res,next) => {
   
        const authToken = req.headers.authorization;

        // console.log(authToken);
        // check token have or not
        if(!authToken){
            return res.status(404).json({
                message: "token is needed"
            })
        };

        // verify token
        const token = authToken.split(" ")[1];
        jwt.verify(token, secretKey, (err, decoded) => {
            if(err){
                return res.status(404).json({
                    message: "Token is invalid"
                })
            } 

            req.id = decoded.id;
            req.username = decoded.username;
            req.email = decoded.email;

            next()
        })
}

export default middleware;