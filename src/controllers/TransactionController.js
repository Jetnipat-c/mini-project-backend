import express from "express";
import { Database } from "../database/database.js";
const transactionRouter = express.Router();
const db = new Database();

transactionRouter.use(express.urlencoded({ extended: false }));

transactionRouter.post("/create", async (req, res, next) => {
  const { userID, tranDate, tranNote, tranType, tranAmount } = req.body;
  let result = await db.createTransaction(userID, tranDate, tranNote, tranType, tranAmount)
  return res.json(result)
})

transactionRouter.get("/getall", async (req,res,next) => {
    let transaction = await db.getAllTransaction();
    return res.json(transaction);
})

transactionRouter.get("/byuser/:id", async (req,res,next) => {
  console.log("control : ",req.params.id);
  let transaction = await db.getByuser(req.params.id);
  return res.json(transaction);
})


transactionRouter.put("/update", async (req,res,next) => {
    let data = req.body
    let result = await db.findTransaction(data)
    return res.json(result)
})

transactionRouter.delete("/delete", async (req,res,next) => {
  var userID =  req.body
  let result = await db.deleteTransaction(req.body)
  return res.json(result)
})

transactionRouter.delete("/deletetran/:tranID", async (req,res,next) => {
  let result = await db.deleteTransactionByTranID(req.params)
  return res.json(result)
})

export default transactionRouter;
