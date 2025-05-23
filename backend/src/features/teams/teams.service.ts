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

const inviteMember = () => {};

const acceptInvite = () => {};

const rejectInvite = () => {};

const leaveTeam = () => {};

const deleteTeam = () => {};

const updateTeam = () => {};

const kickMember = () => {};

export {
  createTeam,
  inviteMember,
  acceptInvite,
  rejectInvite,
  leaveTeam,
  deleteTeam,
  updateTeam,
  kickMember,
};
