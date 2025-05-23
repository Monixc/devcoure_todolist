import { Request, Response, NextFunction } from "express";
import {prisma} from "../../config/db";
import { StatusCodes } from "http-status-codes";

const validateUser = async (req: Request, res: Response) => {
  const user = req.user;
  
  if(!user) {
    return null;
  }

  const dbUser = await prisma.users.findUnique({
    where: {
     userId: user.userId
    },
  });

  return dbUser;
};

export const isTeamLeader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { teamId } = req.params;
  const dbUser = await validateUser(req, res);

  if(!dbUser) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
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
      message: "팀 리더만 이 작업을 수행할 수 있습니다.",
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
      message: "로그인이 필요합니다.",
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
      message: "해당 팀의 멤버만 접근할 수 있습니다.",
    });
    return;
  }

  next();
};