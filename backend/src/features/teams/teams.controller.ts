import { Request, Response } from "express";
import * as teamsService from "./teams.service";
import { StatusCodes } from "http-status-codes";

const createTeam = async (req: Request, res: Response) => {
  const { teamName } = req.body;
  const user = req.user;
  

  const { team, teamLeader } = await teamsService.createTeam(teamName, user);

  res.status(StatusCodes.CREATED).json({
    team,
    teamLeader,
  });
};


const inviteTeam = async (req: Request, res: Response) => {
  const {teamId} = req.params;
  const {invitedUserId } = req.body;
  const invitedBy = req.user;

  const invitation = await teamsService.inviteTeam(Number(teamId), invitedUserId, invitedBy);

  res.status(StatusCodes.CREATED).json({
    invitation,
  });
};

const acceptInvite = async (req: Request, res: Response) => {
  const { inviteId } = req.params;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    const result = await teamsService.acceptInvite(inviteId);
    res.status(StatusCodes.OK).json(result);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const rejectInvite = async (req: Request, res: Response) => {
  const { inviteId } = req.params;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    const result = await teamsService.rejectInvite(inviteId);
    res.status(StatusCodes.OK).json(result);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
}



export { createTeam, inviteTeam, acceptInvite, rejectInvite };
