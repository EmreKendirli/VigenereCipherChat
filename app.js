import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import UserRoute from "./routes/userRoute.js"
import ChatRoute from "./routes/chatRoute.js"
import bodyParser from "body-parser"
// const bodyParser = require('body-parser');
const app = express()
dotenv.config();

conn();
app.use(bodyParser.json());
app.use(express.static("a"))
app.use("/api/v1/user",UserRoute)
app.use("/api/v1/chat",ChatRoute)

const server = app.listen(process.env.PORT,()=>{
    console.log("Baglandı ",process.env.PORT)
})
