import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Database } from "../database/database.js";
import { env } from "../constants/environment.js";

const authRouter = express.Router();
const db = new Database();

authRouter.use(express.urlencoded({ extended: false }));

authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  res.send("Login Succesfully");
});

authRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(500).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const user = await db.findOne({ username, email });
  if (user) {
    return res
      .status(500)
      .json({ message: "มีบัญชีผู้ใช้หรืออีเมลนี้อยู่ในระบบแล้ว" });
  }

  const raw = { username, password, email };
  const hash = await bcrypt.hash(password, env.SALT_ROUND);
  const data = { ...raw, password: hash };
  const createUser = await db.create(data);
  return res.status(200).json(createUser);
});

export default authRouter;
