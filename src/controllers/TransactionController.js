import express from "express";
import { Database } from "../database/database.js";
const authRouter = express.Router();
const db = new Database();

authRouter.use(express.urlencoded({ extended: false }));

authRouter.post("/create", async (req, res, next) => {
  console.log("Transaction con");
  const { userID, tranDate, tranNote, tranType, tranAmount } = req.body;
  console.log(userID, tranDate, tranNote, tranType, tranAmount);
  let result = await db.createTransaction(userID, tranDate, tranNote, tranType, tranAmount)
  console.log(result);
});

export default authRouter;
