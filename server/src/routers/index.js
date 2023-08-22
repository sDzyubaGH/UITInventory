import { Router } from "express";
import statementsRouter from "./statements.js";

const indexRouter = new Router()

indexRouter.use('/statements', statementsRouter)

export default indexRouter