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

export { createTeam };
