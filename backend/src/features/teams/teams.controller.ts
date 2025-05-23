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

const leaveTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    await teamsService.leaveTeam(Number(teamId), user.userId);
    res.status(StatusCodes.OK).json({
      message: "팀을 탈퇴했습니다.",
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
      message: "팀이 삭제되었습니다.",
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
    const updatedTeam = await teamsService.updateTeam(Number(teamId), teamName);
    res.status(StatusCodes.OK).json(updatedTeam);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

const kickMember = async (req: Request, res: Response) => {
  const { teamId, memberId } = req.params;
  
  try {
    await teamsService.kickMember(Number(teamId), Number(memberId));
    res.status(StatusCodes.OK).json({
      message: "멤버가 추방되었습니다.",
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

export { createTeam, inviteTeam, acceptInvite, rejectInvite, leaveTeam, deleteTeam, updateTeam, kickMember };
