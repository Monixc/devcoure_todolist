import express from "express";
import * as teamsController from "./teams.controller";
import authMiddleware from "../auth/auth.middleware";

const teamsRouter = express.Router();

teamsRouter.post("/", authMiddleware, teamsController.createTeam);
teamsRouter.post("/:teamId/invite", authMiddleware, teamsController.inviteTeam);
// teamsRouter.post("/:teamId/invite/:inviteId/accept");
// teamsRouter.post("/:teamId/invite/:inviteId/reject");
// teamsRouter.post("/:teamId/leave");
// teamsRouter.delete("/:teamId");
// teamsRouter.patch("/:teamId");
// teamsRouter.delete("/:teamId/members/:memberId");

export default teamsRouter;
