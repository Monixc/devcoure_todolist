export const TEAMS_CONSTANTS = {
    INVITATION:{
        EXPIRY_HOURS: 24,
        ERROR_MESSAGES:{
            ALREADY_INVITED: '이미 초대가 진행중입니다.',
            ALREADY_MEMBER: '이미 팀 멤버입니다.',
            DUPLICATE_TEAM_NAME: '이미 존재하는 팀 이름입니다.',
            INVITATION_EXPIRED: '초대 만료',
            INVALID_INVITATION: '유효하지 않은 초대입니다.',
            LEADER_CANNOT_LEAVE: '팀 리더는 탈퇴할 수 없습니다.',
            NOT_TEAM_LEADER: '팀 리더만 이 작업을 수행할 수 있습니다.',
            NOT_TEAM_MEMBER: '팀 멤버가 아닙니다.',
            TEAM_NOT_FOUND: '팀을 찾을 수 없습니다.',
            USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
            UNAUTHORIZED: '권한이 없습니다.',
        },
        MESSAGES:{
            INVITE_ACCEPTED: '초대가 수락되었습니다.',
            INVITE_REJECTED: '초대가 거절되었습니다.',
            MEMBER_KICKED: '멤버가 추방되었습니다.',
            TEAM_CREATED: '팀이 생성되었습니다.',
            TEAM_LEAVE: '팀을 탈퇴했습니다.',
            TEAM_DELETED: '팀이 삭제되었습니다.',
            TEAM_INVITED: '팀 초대가 완료되었습니다.',
            TEAM_MEMBERS_FETCHED: '팀 멤버가 조회되었습니다.',
            TEAM_UPDATED: '팀이 수정되었습니다.',
        }
    }
}