import { prisma } from "../../config/db.config";
import { TEAMS_CONSTANTS } from "../../constants/teams.constants";
import type { 
  CreateTeamDto,
  InviteTeamDto,
  TeamInviteActionDto,
  LeaveTeamDto,
  KickMemberDto,
  UpdateTeamDto
} from "../../types/teams.types";
import type { RequestUser } from "../../types/auth.types";

const createTeam = async ({
  teamName
}: CreateTeamDto, user: RequestUser) => {
  const existTeamName = await prisma.teams.findUnique({
    where: { teamName: teamName },
  });

  if (existTeamName) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.DUPLICATE_TEAM_NAME);
  }

  const userInfo = await prisma.users.findUnique({
    where: { userId: user.userId }
  });

  if (!userInfo) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const team = await prisma.teams.create({
    data: {
      teamName,
      fk_created_by: userInfo.id,
    },
  });

  const teamLeader = await prisma.team_members.create({
    data: {
      fk_user_id: userInfo.id,
      fk_team_id: team.id,
      role: "leader",
    },
  });

  return { team, teamLeader };
};

const inviteTeam = async ({
  teamId,
  invitedUserId
}: InviteTeamDto, invitedBy: RequestUser) => {
  const inviter = await prisma.users.findUnique({
    where: { userId: invitedBy.userId }
  });

  if (!inviter) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const team = await prisma.teams.findUnique({
    where: { id: teamId },
    include: {
      team_members: {
        where: {
          fk_user_id: inviter.id,
          role: "leader",
        },
      },
    },
  });

  if (!team) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.TEAM_NOT_FOUND);
  }

  if (team.team_members.length === 0) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.NOT_TEAM_LEADER);
  }

  const invitedUser = await prisma.users.findUnique({
    where: { userId: invitedUserId },
  });

  if (!invitedUser) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const isMember = await prisma.team_members.findFirst({
    where: {
      AND: [
        { fk_team_id: teamId },
        { fk_user_id: invitedUser.id }
      ]
    }
  });

  if (isMember) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.ALREADY_MEMBER);
  }

  const existingInvitation = await prisma.team_invitations.findFirst({
    where: {
      fk_team_id: teamId,
      fk_user_id: invitedUser.id,
      status: 'pending',
    },
  });

  if (existingInvitation) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.ALREADY_INVITED);
  }

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + TEAMS_CONSTANTS.INVITATION.EXPIRY_HOURS);

  return await prisma.team_invitations.create({
    data: {
      id: crypto.randomUUID(),
      fk_team_id: teamId,
      fk_invited_by: inviter.id,
      fk_user_id: invitedUser.id,
      role: 'member',
      status: 'pending',
      expires_at: expiresAt,
    },
  });
};

const acceptInvite = async ({
  inviteId,
  userId
}: TeamInviteActionDto) => {
  const invitation = await prisma.team_invitations.findUnique({
    where: { id: inviteId },
    include: {
      users_team_invitations_fk_user_idTousers: true
    }
  });

  if (!invitation || invitation.status !== 'pending') {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.INVALID_INVITATION);
  }

  if (invitation.users_team_invitations_fk_user_idTousers.userId !== userId) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED);
  }

  return await prisma.$transaction([
    prisma.team_invitations.update({
      where: { id: inviteId },
      data: { 
        status: 'accepted',
        accepted_at: new Date()
      }
    }),
    prisma.team_members.create({
      data: {
        fk_team_id: invitation.fk_team_id,
        fk_user_id: invitation.fk_user_id,
        role: 'member'
      }
    })
  ]);
};

const rejectInvite = async ({
  inviteId,
  userId
}: TeamInviteActionDto) => {
  const invitation = await prisma.team_invitations.findUnique({
    where: { id: inviteId },
    include: {
      users_team_invitations_fk_user_idTousers: true
    }
  });

  if (!invitation || invitation.status !== 'pending') {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.INVALID_INVITATION);
  }

  if (invitation.users_team_invitations_fk_user_idTousers.userId !== userId) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.UNAUTHORIZED);
  }

  return await prisma.team_invitations.update({
    where: { id: inviteId },
    data: { status: 'rejected' }
  });
};

const leaveTeam = async ({
  teamId,
  userId
}: LeaveTeamDto) => {
  const user = await prisma.users.findUnique({
    where: { userId }
  });

  if (!user) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const teamMember = await prisma.team_members.findFirst({
    where: {
      fk_team_id: teamId,
      fk_user_id: user.id
    }
  });

  if (!teamMember) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.NOT_TEAM_MEMBER);
  }

  if (teamMember.role === 'leader') {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.LEADER_CANNOT_LEAVE);
  }

  return await prisma.team_members.delete({
    where: {
      id: teamMember.id
    }
  });
};

const deleteTeam = async (teamId: number) => {
  return await prisma.$transaction([
    prisma.team_invitations.deleteMany({
      where: { fk_team_id: teamId }
    }),
    prisma.team_todos.deleteMany({
      where: { fk_team_id: teamId }
    }),
    prisma.team_members.deleteMany({
      where: { fk_team_id: teamId }
    }),
    prisma.teams.delete({
      where: { id: teamId }
    })
  ]);
};

const updateTeam = async (teamId: number, { teamName }: UpdateTeamDto) => {
  const existingTeam = await prisma.teams.findFirst({
    where: {
      teamName,
      NOT: {
        id: teamId
      }
    }
  });

  if (existingTeam) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.DUPLICATE_TEAM_NAME);
  }

  return await prisma.teams.update({
    where: { id: teamId },
    data: { teamName }
  });
};

const kickMember = async ({
  teamId,
  memberId
}: KickMemberDto) => {
  const teamMember = await prisma.team_members.findUnique({
    where: { id: memberId }
  });

  if (!teamMember || teamMember.fk_team_id !== teamId) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.NOT_TEAM_MEMBER);
  }

  if (teamMember.role === 'leader') {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.LEADER_CANNOT_LEAVE);
  }

  return await prisma.team_members.delete({
    where: { id: memberId }
  });
};

const getTeamMembers = async (teamId: number) => {
  const team = await prisma.teams.findUnique({
    where: { id: teamId },
    include: {
      team_members: {
        include: {
          users: {
            select: {
              id: true,
              userId: true,
            }
          }
        }
      }
    }
  });

  if (!team) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.TEAM_NOT_FOUND);
  }

  return team.team_members;
};

const getTeams = async (user: RequestUser) => {
  const userInfo = await prisma.users.findUnique({
    where: { userId: user.userId }
  });

  if (!userInfo) {
    throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const teams = await prisma.teams.findMany({
    where: {
      team_members: {
        some: {
          fk_user_id: userInfo.id
        }
      }
    },
    include: {
      team_members: {
        where: {
          fk_user_id: userInfo.id
        },
        select: {
          role: true
        }
      }
    }
  });

  return teams.map(team => ({
    ...team,
    role: team.team_members[0].role,
    team_members: undefined
  }));
};

const getInvitations = async (userId: string) => {
  const user = await prisma.users.findUnique({ where: { userId } });
  if (!user) throw new Error(TEAMS_CONSTANTS.INVITATION.ERROR_MESSAGES.USER_NOT_FOUND);

  return await prisma.team_invitations.findMany({
    where: { fk_user_id: user.id, status: "pending" },
    include: {
      teams: { select: { id: true, teamName: true } }
    },
    orderBy: { created_at: "desc" }
  });
};

const getTeamInvitations = async (teamId: number) => {
  return await prisma.team_invitations.findMany({
    where: { fk_team_id: teamId, status: "pending" },
    include: {
      users_team_invitations_fk_user_idTousers: { 
        select: { userId: true }
      }
    },
    orderBy: { created_at: "desc" }
  });
};

const deleteInvitation = async (inviteId: string) => {
  return await prisma.team_invitations.delete({
    where: { id: inviteId }
  });
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
  getTeams,
  getInvitations,
  getTeamInvitations,
  deleteInvitation
};

