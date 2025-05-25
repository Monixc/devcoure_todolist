import api from "./api";
import { extractErrorMessage } from "../utils/error";

// 내 팀 목록 조회
export async function fetchMyTeams() {
  try {
    const res = await api.get("/teams");
    return res.data.teams;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 생성
export async function createTeam(teamName: string) {
  try {
    const res = await api.post("/teams", { teamName });
    return res.data.team;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 초대받은 목록 조회 
export async function fetchInvitations() {
  try {
    const res = await api.get("/teams/invitations");
    return res.data.invitations;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 초대 보내기
export async function inviteToTeam(teamId: number, invitedUserId: string) {
  try {
    const res = await api.post(`/teams/${teamId}/invite`, { invitedUserId });
    return res.data.invitation;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 초대 수락
export async function acceptInvitation(inviteId: string) {
  try {
    const res = await api.post(`/teams/invitations/${inviteId}/accept`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 초대 거절
export async function rejectInvitation(inviteId: string) {
  try {
    const res = await api.post(`/teams/invitations/${inviteId}/reject`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 삭제
export async function deleteTeam(teamId: number) {
  try {
    const res = await api.delete(`/teams/${teamId}`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 정보 수정
export async function updateTeam(teamId: number, teamName: string) {
  try {
    const res = await api.patch(`/teams/${teamId}`, { teamName });
    return res.data.updatedTeam;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 탈퇴
export async function leaveTeam(teamId: number) {
  try {
    const res = await api.post(`/teams/${teamId}/leave`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀원 목록 조회
export async function fetchTeamMembers(teamId: number) {
  try {
    const res = await api.get(`/teams/${teamId}/members`);
    return res.data.members;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀원 강퇴
export async function kickTeamMember(teamId: number, memberId: number) {
  try {
    const res = await api.delete(`/teams/${teamId}/members/${memberId}`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
} 