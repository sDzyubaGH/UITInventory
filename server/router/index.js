import { Router } from "express";
import authRouter from "./authRouter.js";

const indexRouter = new Router();

indexRouter.use("/user", authRouter);

export default indexRouter;
