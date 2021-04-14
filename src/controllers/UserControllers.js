import express from 'express';
const userRouter = express.Router();

userRouter.get("",(req,res,next)=>{
    console.log("Into User")
    res.send("55555")
})

export default userRouter