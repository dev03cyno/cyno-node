import express from 'express'
const app = express()
import cors from 'cors';
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser";
import userRouter from './routes/user.js';
dotenv.config();


app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(morgan("common"))
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const port = process.env.PORT

app.use("/api/v1/user",userRouter)

app.get('/',(req,res)=>{
    res.send("I am working")
})

app.listen(port,()=>{
    console.log(`running in port ${port}`)
})