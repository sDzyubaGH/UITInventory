import { Router } from "express";
import Statements from "../controllers/Statements.js";

const statementsRouter = new Router()

statementsRouter.use('/', Statements.get)

export default statementsRouter