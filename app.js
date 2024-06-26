
import express from "express";
const app = express()
const port = 5000
import dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser";
import cors from "cors"
import userrouter from "./routes/userRoute.js";
import mongoose from "mongoose";
import adminroute from "./routes/adminRoute.js";

const mongodb = process.env.MONGO_DB;

main().catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongodb)
    console.log("db connected");
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/api/users' , userrouter)
app.use('/api/admin',adminroute)



app.listen(port,() =>{
    console.log("server is listening in port ", port);
})