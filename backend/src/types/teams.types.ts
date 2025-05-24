export interface CreateTeamDto {
  teamName: string;
}

export interface UpdateTeamDto {
  teamName: string;
}

export interface InviteTeamDto {
  teamId: number;
  invitedUserId: string;
}

export interface TeamInviteActionDto {
  inviteId: string;
  userId: string;
}

export interface LeaveTeamDto {
  teamId: number;
  userId: string;
}

export interface KickMemberDto {
  teamId: number;
  memberId: number;
}

