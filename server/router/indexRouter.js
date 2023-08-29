import { Router } from "express";
import { authController } from "../controllers/AuthController.js";

const indexRouter = new Router();

indexRouter.post("/registration", authController.registration);
indexRouter.post("/login", authController.login);
indexRouter.post("/logout", authController.logout);
indexRouter.get("/refresh", authController.refresh);
indexRouter.get("/users", authController.getUsers);

export default indexRouter;
