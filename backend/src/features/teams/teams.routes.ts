import express from "express";
import * as teamsController from "./teams.controller";
import authMiddleware from "../auth/auth.middleware";
import { isTeamLeader } from "./team-auth.middleware";

const teamsRouter = express.Router();

teamsRouter.post("/", authMiddleware, teamsController.createTeam);
teamsRouter.post("/:teamId/invite", authMiddleware, isTeamLeader, teamsController.inviteTeam);
teamsRouter.post("/:teamId/invite/:inviteId/accept", authMiddleware, teamsController.acceptInvite);
teamsRouter.post("/:teamId/invite/:inviteId/reject", authMiddleware, teamsController.rejectInvite);
// teamsRouter.post("/:teamId/leave");
// teamsRouter.delete("/:teamId");
// teamsRouter.patch("/:teamId");
// teamsRouter.delete("/:teamId/members/:memberId");

export default teamsRouter;
