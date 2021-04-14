import express from "express";
import cors from "cors";
import environment from './constants/_environment'

const app = express();
const {BASE_API , PORT} = environment

app.use(cors());

app.get("/", (_, res) => res.send("Finance Management Server is running ✅ 🎉"));

app.listen(PORT,()=>{console.log(`Finance Management Server is running on ${BASE_API}`)})