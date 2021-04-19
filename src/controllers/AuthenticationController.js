import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Database } from "../database/database.js";
import { env } from "../constants/environment.js";
import "../public/passport.js";
import cookie from "cookie";
const authRouter = express.Router();
const db = new Database();

authRouter.use(express.urlencoded({ extended: false }));
import jwt from "jsonwebtoken";
authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  let time_exp;
  passport.authenticate("local", { session: false }, (err, user, info) => {
    //console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
      if (req.body.remember == true) {
       // console.log(" remember true");
        time_exp = "7d";
      } else time_exp = "1d";
      const token = jwt.sign(user, env.SECRET, {
        expiresIn: time_exp,
      });
      //console.log(" token", token);
      var decoded = jwt.decode(token);
      //let time = "" + new Date(decoded.exp * 1000);
      let time = new Date(decoded.exp * 1000);
      //let str = time.substring(0, 10);
      //console.log(new Date(decoded.exp * 1000));
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
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
