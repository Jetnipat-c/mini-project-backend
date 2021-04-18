import express from "express";
import { Database } from "../database/database.js";
const authRouter = express.Router();
const db = new Database();

authRouter.use(express.urlencoded({ extended: false }));

authRouter.post("/create", async (req, res, next) => {
  const { userID, tranDate, tranNote, tranType, tranAmount } = req.body;
  let result = await db.createTransaction(userID, tranDate, tranNote, tranType, tranAmount)
  return res.json(result)
})

authRouter.get("/getall", async (req,res,next) => {
    console.log("sdsd")
    let transaction = await db.getAllTransaction();
    console.log("transaction", transaction)
    return res.json(transaction);
})

export default authRouter;
