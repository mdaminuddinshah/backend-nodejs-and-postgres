import express from "express";
import health from "./controller/health.js";
import connectDB from "./database/DBINIT.js";
import register from "./controller/register.js";
import getData from "./controller/get.js";
import login from "./controller/login.js";
import createText from "./controller/todos/createTodo.js";
import getTodos from "./controller/todos/getTodo.js";
import middleware from "./middleware/middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

app.get("/health", health);
app.get("/users", getData);
app.get("/login", login);
app.get("/getTodos",middleware, getTodos);
app.post("/register", register);
app.post("/text",middleware, createText);
app.listen(1002);