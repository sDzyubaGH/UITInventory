import express from "express";
import "dotenv/config";
import cors from "cors";
import indexRouter from "./router/index.js";
import { logger } from "./logger.js";
import errorLogHandler from "./errorLogHandler.js";
import errorHandler from "./errorHandler.js";

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());

app.use("/api", indexRouter);

// logging
app.use(errorLogHandler)
// error handler
app.use(errorHandler)

const start = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`Server start on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error.message)
    process.exit(-1)
  }
};

start();