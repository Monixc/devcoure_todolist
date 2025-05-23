import express from "express";
import * as teamsController from "./teams.controller";
import jwtAuthMiddleware from "../../middlewares/jwt.middleware";
import { isTeamLeader, isTeamMember } from "./team-auth.middleware";

const teamsRouter = express.Router();

teamsRouter.post("/", jwtAuthMiddleware, teamsController.createTeam);
teamsRouter.get("/", jwtAuthMiddleware, teamsController.getTeams);
teamsRouter.post("/:teamId/invite", jwtAuthMiddleware, isTeamLeader, teamsController.inviteTeam);
teamsRouter.post("/invitations/:inviteId/accept", jwtAuthMiddleware, teamsController.acceptInvite);
teamsRouter.post("/invitations/:inviteId/reject", jwtAuthMiddleware, teamsController.rejectInvite);
teamsRouter.post("/:teamId/leave", jwtAuthMiddleware, teamsController.leaveTeam);
teamsRouter.delete("/:teamId", jwtAuthMiddleware, isTeamLeader, teamsController.deleteTeam);
teamsRouter.patch("/:teamId", jwtAuthMiddleware, isTeamLeader, teamsController.updateTeam);
teamsRouter.delete("/:teamId/members/:memberId", jwtAuthMiddleware, isTeamLeader, teamsController.kickMember);
teamsRouter.get("/:teamId/members", jwtAuthMiddleware, isTeamMember, teamsController.getTeamMembers);

export default teamsRouter;
