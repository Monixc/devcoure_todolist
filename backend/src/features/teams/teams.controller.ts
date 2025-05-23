import { Request, Response } from "express";
import * as teamsService from "./teams.service";
import { StatusCodes } from "http-status-codes";
import { TEAMS_CONSTANTS } from "../../constants/teams.constants";


const createTeam = async (req: Request, res: Response) => {
  const { teamName } = req.body;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const { team, teamLeader } = await teamsService.createTeam({ teamName }, user);
    res.status(StatusCodes.CREATED).json({
      team,
      teamLeader,
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.TEAM_CREATED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const inviteTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { invitedUserId } = req.body;
  const invitedBy = req.user;

  if (!invitedBy) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const invitation = await teamsService.inviteTeam({ 
      teamId: Number(teamId), 
      invitedUserId 
    }, invitedBy);

    res.status(StatusCodes.CREATED).json({
      invitation,
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.TEAM_INVITED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const acceptInvite = async (req: Request, res: Response) => {
  const { inviteId } = req.params;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const result = await teamsService.acceptInvite({ 
      inviteId, 
      userId: user.userId 
    });
    res.status(StatusCodes.OK).json({
      result,
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.INVITE_ACCEPTED,
    });
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
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const result = await teamsService.rejectInvite({ 
      inviteId, 
      userId: user.userId 
    });
    res.status(StatusCodes.OK).json({
      result,
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.INVITE_REJECTED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const leaveTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    await teamsService.leaveTeam({ 
      teamId: Number(teamId), 
      userId: user.userId 
    });
    res.status(StatusCodes.OK).json({
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.TEAM_LEAVE,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const deleteTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  try {
    await teamsService.deleteTeam(Number(teamId));
    res.status(StatusCodes.OK).json({
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.TEAM_DELETED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const updateTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { teamName } = req.body;
  
  try {
    const updatedTeam = await teamsService.updateTeam(Number(teamId), { teamName });
    res.status(StatusCodes.OK).json({
      updatedTeam,
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.TEAM_UPDATED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const kickMember = async (req: Request, res: Response) => {
  const { teamId, memberId } = req.params;
  
  try {
    await teamsService.kickMember({ 
      teamId: Number(teamId), 
      memberId: Number(memberId) 
    });
    res.status(StatusCodes.OK).json({
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.MEMBER_KICKED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const getTeamMembers = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  
  try {
    const members = await teamsService.getTeamMembers(Number(teamId));
    res.status(StatusCodes.OK).json({
      members,
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.TEAM_MEMBERS_FETCHED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const getTeams = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const teams = await teamsService.getTeams(user);
    res.status(StatusCodes.OK).json({
      teams,
      message: TEAMS_CONSTANTS.INVITATION.MESSAGES.TEAMS_FETCHED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};


export { 
  createTeam, 
  inviteTeam, 
  acceptInvite, 
  rejectInvite, 
  leaveTeam, 
  deleteTeam, 
  updateTeam, 
  kickMember, 
  getTeamMembers,
  getTeams
};
