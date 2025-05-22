import express, { RequestHandler } from "express";
const authRouter = express.Router();
import * as authController from "./auth.controller.js";

authRouter.post("/join", authController.join as unknown as RequestHandler);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.getRefreshToken);
authRouter.post("/logout", authController.logout);
authRouter.get("/session-check", authController.getSession);
authRouter.post("/email/send", authController.sendEmai);
authRouter.post("/email/verify", authController.isEmailVerified);
authRouter.get("/email/status", authController.getEmailStatus);
authRouter.get("/email/check-email", authController.isValidEmail);

export default authRouter;
