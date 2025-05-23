import { Request, Response, NextFunction } from "express";
import {prisma} from "../../config/db";
import { StatusCodes } from "http-status-codes";
import { TEAMS_CONSTANTS } from "../../constants/teams.constants";
import validateUser from "../validation/user.middleware";

export const isTeamLeader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { teamId } = req.params;
  const dbUser = await validateUser(req, res);

  if(!dbUser) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  const teamLeader = await prisma.team_members.findFirst({
    where: {
      fk_team_id: Number(teamId),
      fk_user_id: dbUser.id,
      role: "leader",
    },
  });

  if (!teamLeader) {
    res.status(StatusCodes.FORBIDDEN).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.NOT_TEAM_LEADER,
    });
    return;
  }

  next();
};

export const isTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { teamId } = req.params;
  const dbUser = await validateUser(req, res);

  if (!dbUser) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  const teamMember = await prisma.team_members.findFirst({
    where: {
      fk_team_id: Number(teamId),
      fk_user_id: dbUser.id,
    },
  });

  if (!teamMember) {
    res.status(StatusCodes.FORBIDDEN).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.NOT_TEAM_MEMBER,
    });
    return;
  }

  next();
};