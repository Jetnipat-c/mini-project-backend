import express from "express";
const authRouter = express.Router();

authRouter.get("/signin", (req, res, next) => {
  console.log("signin");
  res.send("signin");
});

export default authRouter;
