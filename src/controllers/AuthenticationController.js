import express from "express"
import bcrypt from "bcrypt"
import passport from "passport"
import { Database } from "../database/database.js"
import { env } from "../constants/environment.js"
import "../public/passport.js"
import { AuthenService } from "../services/AuthenService.js"
import cookie from "cookie"
import jwt from "jsonwebtoken"

const authRouter = express.Router()
const db = new Database()
const authenService = new AuthenService()

authRouter.use(express.urlencoded({ extended: false }))

authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body
  //console.log(username, password);
  let time_exp
  passport.authenticate("local", { session: false }, (err, user, info) => {
    //console.log("Login: ", req.body, user, err, info);
    if (err) return next(err)
    if (user) {
      if (req.body.remember == true) {
        time_exp = "7d"
      } else time_exp = "1d"
      const token = jwt.sign(user, env.SECRET, {
        expiresIn: time_exp
      })
      var decoded = jwt.decode(token)
      let time = new Date(decoded.exp * 1000)
      //console.log(time);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/"
        })
      )
      res.statusCode = 200
      return res.json({ user, token })
    } else return res.status(422).json(info)
  })(req, res, next)
})

authRouter.post("/register", async (req, res, next) => {
  authenService
    .registUser(req, res)
    .then((result) => {
      return result
    })
    .catch((err) => next(err))
})

authRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user)
  }
)

authRouter.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/"
    })
  )
  res.statusCode = 200
  return res.json({ message: "Logout successful" })
})

authRouter.get("/guest", async (req, res, next) => {
  let username = Math.random().toString(36).substring(2)
  //console.log("username: ", username);
  let emailText = "@guest.mail"
  let email = username.concat(emailText)
  //console.log("email: ",email);
  let password = "123456"
  //console.log("password: ",password);
  authenService.registGuestUser(username, email, password, res)
})

export default authRouter
