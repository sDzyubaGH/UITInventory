import express from "express";
import "dotenv/config";
import cors from "cors";

import indexRouter from "../router/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api", indexRouter);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
