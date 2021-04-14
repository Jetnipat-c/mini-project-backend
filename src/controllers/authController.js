import express from "express";
const userRouter = express.Router();

userRouter.get("/signin", (req, res, next) => {
  console.log("signin");
  res.send("signin");
});

export default userRouter;
