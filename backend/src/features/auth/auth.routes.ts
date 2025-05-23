import express from "express";
import * as authController from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/join", authController.join);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);

export default authRouter;
