import express from "express";
import * as authController from "./auth.controller";

const authRouter = express.Router();

// @ts-ignorets
authRouter.post("/join", authController.join);
// @ts-ignorets
authRouter.post("/login", authController.login);
// @ts-ignorets
authRouter.post("/refresh", authController.refresh);

// authRouter.post("/email/send", authController.sendEmai);
// authRouter.post("/email/verify", authController.isEmailVerified);
// authRouter.get("/email/status", authController.getEmailStatus);
// authRouter.get("/email/check-email", authController.isValidEmail);

export default authRouter;
