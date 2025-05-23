import express from "express";
import * as teamsController from "./teams.controller";
import authMiddleware from "../auth/auth.middleware";
import { isTeamLeader } from "./team-auth.middleware";

const teamsRouter = express.Router();

teamsRouter.post("/", authMiddleware, teamsController.createTeam);
teamsRouter.post("/:teamId/invite", authMiddleware, isTeamLeader, teamsController.inviteTeam);
teamsRouter.post("/invitations/:inviteId/accept", authMiddleware, teamsController.acceptInvite);
teamsRouter.post("/invitations/:inviteId/reject", authMiddleware, teamsController.rejectInvite);
teamsRouter.post("/:teamId/leave", authMiddleware, teamsController.leaveTeam);
teamsRouter.delete("/:teamId", authMiddleware, isTeamLeader, teamsController.deleteTeam);
teamsRouter.patch("/:teamId", authMiddleware, isTeamLeader, teamsController.updateTeam);
teamsRouter.delete("/:teamId/members/:memberId", authMiddleware, isTeamLeader, teamsController.kickMember);

export default teamsRouter;
