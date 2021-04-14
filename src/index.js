import express from "express";
import cors from "cors";
import { env } from "./constants/environment.js";
const app = express();
const { PORT } = env;

app.use(cors());

app.get("/", (_, res) =>
  res.send("Finance Management Server is running ✅ 🎉")
);

app.listen(PORT, () => {
  console.log(`Finance Management Server is running on ${PORT}`);
});
