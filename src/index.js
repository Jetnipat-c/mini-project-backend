import express from "express";
import cors from "cors";
const PORT = 6969;
const app = express();

app.use(cors());

app.get("/", (_, res) =>
  res.send("Finance Management Server is running ✅ 🎉")
);

app.listen(PORT, () => {
  console.log(`Finance Management Server is running on ${PORT}`);
});
