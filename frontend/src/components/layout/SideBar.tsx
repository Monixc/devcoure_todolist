import styled from "styled-components";
import { PopupMenu } from "../common/PopupMenu";
import { colors } from "../../styles/tokens/colors";
import { useState, useEffect } from "react";
import { PersonalTodoButton } from "./SideBar/PersonalTodoButton";
import { ListSection } from "./SideBar/ListSection";
import { CreateTeamModal } from "./SideBar/CreateTeamModal";
import { InviteModal } from "./SideBar/InviteModal";
import { DeleteTeamModal } from "./SideBar/DeleteTeamModal";
import { usePopupMenu } from "../../hooks/usePopupMenu";
import {
  fetchMyTeams,
  createTeam,
  fetchInvitations,
  acceptInvitation,
  rejectInvitation,
  inviteToTeam,
  deleteTeam,
  getTeamInvitations,
  deleteInvitation
} from "../../services/teamApi";

interface Team {
  id: number;
  teamName: string;
  role: string;
}
interface Invitation {
  id: string;
  teamName: string;
}

export const Sidebar = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteInput, setInviteInput] = useState("");
  const [invitedMembers, setInvitedMembers] = useState<{id: string, userId: string}[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [_, setLoading] = useState(false);
  const [error, setError] = useState("");

  const teamMenu = usePopupMenu();
  const inviteMenu = usePopupMenu();

  // 팀/초대 목록 불러오기
  const loadTeamsAndInvitations = async () => {
    setLoading(true);
    setError("");
    try {
      const [teamsRes, invitesRes] = await Promise.all([
        fetchMyTeams(),
        fetchInvitations()
      ]);
      setTeams(teamsRes);
      setInvitations(invitesRes.map((inv: any) => ({
        id: inv.id,
        teamName: inv.teams?.teamName || "(알 수 없음)"
      })));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamsAndInvitations();
  }, []);

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    setLoading(true);
    setError("");
    try {
      await createTeam(newTeamName);
      setNewTeamName("");
      setIsModalOpen(false);
      await loadTeamsAndInvitations();
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 초대 수락/거절
  const handleAcceptInvite = async () => {
    if (!inviteMenu.selectedId) return;
    setLoading(true);
    setError("");
    try {
      await acceptInvitation(String(inviteMenu.selectedId));
      await loadTeamsAndInvitations();
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      inviteMenu.closeMenu();
    }
  };
  const handleRejectInvite = async () => {
    if (!inviteMenu.selectedId) return;
    setLoading(true);
    setError("");
    try {
      await rejectInvitation(String(inviteMenu.selectedId));
      await loadTeamsAndInvitations();
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      inviteMenu.closeMenu();
    }
  };

  // 팀에 초대한 멤버 fetch
  const fetchInvitedMembers = async (teamId: number) => {
    setLoading(true);
    setError("");
    try {
      const members = await getTeamInvitations(teamId);
      setInvitedMembers(
        members.map((m: any) => ({
          id: m.id,
          userId: m.users_team_invitations_fk_user_idTousers.userId
        }))
      );
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  // 팀 초대하기
  const handleInvite = async () => {
    if (!inviteInput.trim() || !teamMenu.selectedId) return;
    setLoading(true);
    setError("");
    try {
      await inviteToTeam(Number(teamMenu.selectedId), inviteInput.trim());
      setInviteInput("");
      await fetchInvitedMembers(Number(teamMenu.selectedId));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 초대 삭제
  const handleRemoveInvited = async (inviteId: string) => {
    if (!teamMenu.selectedId) return;
    setLoading(true);
    setError("");
    try {
      await deleteInvitation(inviteId);
      await fetchInvitedMembers(Number(teamMenu.selectedId));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 팀 삭제
  const handleDeleteTeam = async () => {
    if (!teamMenu.selectedId) return;
    setLoading(true);
    setError("");
    try {
      await deleteTeam(Number(teamMenu.selectedId));
      await loadTeamsAndInvitations();
    } catch (err: any) {
      setError(err);
    } finally {
      setIsDeleteModalOpen(false);
      setLoading(false);
    }
  };

  const menuItems = [
    {
      label: "팀 초대하기",
      onClick: () => {
        teamMenu.closeMenu();
        setIsInviteModalOpen(true);
        if (teamMenu.selectedId) {
          fetchInvitedMembers(Number(teamMenu.selectedId));
        }
      }
    },
    {
      label: "팀 삭제하기",
      onClick: () => {
        teamMenu.closeMenu();
        setIsDeleteModalOpen(true);
      }
    }
  ];

  const inviteMenuItems = [
    {
      label: "초대 수락",
      onClick: handleAcceptInvite
    },
    {
      label: "초대 거절",
      onClick: handleRejectInvite
    }
  ];

  return (
    <Container>
      <PersonalTodoButton />
      {error && <div style={{ color: colors.red[500], fontSize: 14 }}>{error}</div>}
      <ListSection
        title="내 팀 목록"
        items={teams.map(t => ({ id: t.id, name: t.teamName }))}
        onMenuOpen={teamMenu.openMenu}
        buttonText="팀 만들기"
        onButtonClick={() => setIsModalOpen(true)}
      />
      <ListSection
        title="초대받은 목록"
        items={invitations.map(i => ({ id: i.id, name: i.teamName }))}
        onMenuOpen={inviteMenu.openMenu}
      />
      <CreateTeamModal
        isOpen={isModalOpen}
        newTeamName={newTeamName}
        onChange={setNewTeamName}
        onConfirm={handleCreateTeam}
        onCancel={() => {
          setIsModalOpen(false);
          setNewTeamName("");
        }}
      />
      <InviteModal
        isOpen={isInviteModalOpen}
        inviteInput={inviteInput}
        invitedMembers={invitedMembers}
        onInputChange={setInviteInput}
        onInvite={handleInvite}
        onRemoveInvited={handleRemoveInvited}
        onClose={() => setIsInviteModalOpen(false)}
      />
      <DeleteTeamModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteTeam}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
      <PopupMenu
        open={teamMenu.open}
        anchorPosition={teamMenu.position}
        items={menuItems}
        onClose={teamMenu.closeMenu}
      />
      <PopupMenu
        open={inviteMenu.open}
        anchorPosition={inviteMenu.position}
        items={inviteMenuItems}
        onClose={inviteMenu.closeMenu}
      />
    </Container>
  );
};

const Container = styled.div`
    width: 240px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-right: 24px;
    border-right: 1px solid ${colors.gray[400]};
    height: 100vh;
    background-color: white;
`;


