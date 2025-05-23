import { prisma } from "../../config/db";

const createTeam = async (teamName: string, user: any) => {
  const existTeamName = await prisma.teams.findUnique({
    where: { teamName },
  });

  //팀 이름 중복 체크
  if (existTeamName) {
    throw new Error("이미 존재하는 팀 이름입니다.");
  }

  //팀 생성
  const team = await prisma.teams.create({
    data: {
      teamName,
      fk_created_by: user.id,
    },
  });

  //팀 생성 시 팀장
  const teamLeader = await prisma.team_members.create({
    data: {
      fk_user_id: user.id,
      fk_team_id: team.id,
      role: "leader",
    },
  });

  return { team, teamLeader };
};

const inviteTeam = async (
  teamId: number,
  invitedUserId: string,
  invitedBy: any
) => {
  const team = await prisma.teams.findUnique({
    where: { id: teamId },
    include: {
      team_members: {
        where: {
          fk_user_id: invitedBy.id,
          role: "leader",
        },
      },
    },
  });

  if (!team) {
    throw new Error("팀을 찾을 수 없습니다");
  }

  if (team.team_members.length === 0) {
    throw new Error("팀 리더만 초대할 수 있습니다");
  }

  const invitedUser = await prisma.users.findUnique({
    where: { userId: invitedUserId },
  });

  if (!invitedUser) {
    throw new Error("초대할 유저를 찾을 수 없습니다");
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
    throw new Error("이미 팀에 속한 유저입니다");
  }

  const existingInvitation = await prisma.team_invitations.findFirst({
    where: {
      fk_team_id: teamId,
      fk_user_id: invitedUser.id,
      status: 'pending',
    },
  });

  if (existingInvitation) {
    throw new Error("이미 초대가 진행중입니다.");
  }

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const invitation = await prisma.team_invitations.create({
    data: {
      id: crypto.randomUUID(),
      fk_team_id: teamId,
      fk_invited_by: invitedBy.id,
      fk_user_id: invitedUser.id,
      role: 'member',
      status: 'pending',
      expires_at: expiresAt,
    },
  });

  return invitation;
};

const acceptInvite = async (inviteId: string) => {
  const invitation = await prisma.team_invitations.findUnique({
    where: { id: inviteId }
  });

  if (!invitation || invitation.status !== 'pending') {
    throw new Error('유효하지 않은 초대입니다.');
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

const rejectInvite = async (inviteId: string) => {
  const invitation = await prisma.team_invitations.findUnique({
    where: { id: inviteId }
  });

  if (!invitation || invitation.status !== 'pending') {
    throw new Error('유효하지 않은 초대입니다.');
  }

  return await prisma.team_invitations.update({
    where: { id: inviteId },
    data: { status: 'rejected' }
  });
};

const leaveTeam = () => {};

const deleteTeam = () => {};

const updateTeam = () => {};

const kickMember = () => {};

export {
  createTeam,
  inviteTeam,
  acceptInvite,
  rejectInvite,
  leaveTeam,
  deleteTeam,
  updateTeam,
  kickMember,
};
