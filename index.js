import express from "express";
import health from "./controller/health.js";
import connectDB from "./database/DBINIT.js";
import register from "./controller/register.js";
import getData from "./controller/get.js";
import login from "./controller/login.js";
import createText from "./controller/todos/createTodo.js";
import getTodos from "./controller/todos/getTodo.js";
import middleware from "./middleware/middleware.js";
import updateTodo from "./controller/todos/updateTodo.js";
import cors from "cors";

const app = express();

// utk kita return response dari database ke frontend
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

app.get("/", health);
app.get("/users", getData);
app.post("/login", login);
app.get("/getTodos",middleware, getTodos);
app.post("/register", register);
app.post("/text",middleware, createText);
app.put("/updateTodo/:id", middleware, updateTodo);
app.listen(1002);