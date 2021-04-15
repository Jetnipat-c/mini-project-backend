import express from "express";
import { UserService } from "../services/UserService.js";

const userRouter = express.Router();
const userService = new UserService();

userRouter.post("/", (req, res, next) => {
  userService
    .createUser(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

export default userRouter;
