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

export { createTeam, inviteTeam };
