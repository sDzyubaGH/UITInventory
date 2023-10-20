import { Router } from "express";
import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";

const indexRouter = new Router();

indexRouter.use("/user", authRouter);
indexRouter.use("/product", productRouter);

export default indexRouter;
