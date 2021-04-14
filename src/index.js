import express from "express";
import cors from "cors";
import { env } from "./constants/environment.js";
import UserController from "./controllers/UserControllers.js";
import AuthController from "./controllers/authController.js";
const app = express();
const { PORT } = env;

app.use(cors());

app.use(`/api/user`, UserController);
app.use(`/api`, AuthController);

app.get("/", (_, res) =>
  res.send("Finance Management Server is running ✅ 🎉")
);

app.listen(PORT, () => {
  console.log(`Finance Management Server is running on ${PORT}`);
});
