import bcrypt from "bcrypt";
import passport from "passport";
import { Database } from "../database/database.js";
import "../public/passport.js";
import { env } from "../constants/environment.js";
const db = new Database();
export class AuthenService {
  async registUser  (req,res) {
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
    //console.log("rew", raw);
    const hash = await bcrypt.hash(password, env.SALT_ROUND);
    //console.log("hash", hash);
    const data = { ...raw, password: hash };
    //console.log("data", data);
    const createUser = await db.create(data);
    console.log("createUser", createUser);
    return res.status(200).json(createUser);
  };

  async registGuestUser  (username,email,password,res) {
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
    //console.log("rew", raw);
    const hash = await bcrypt.hash(password, env.SALT_ROUND);
    //console.log("hash", hash);
    const data = { ...raw, password: hash };
    //console.log("data", data);
    const createUser = await db.create(data);
    console.log("createUser", createUser);
    return res.status(200).json(createUser);
  };
}
