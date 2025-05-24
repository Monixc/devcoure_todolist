import styled from "styled-components";
import { PopupMenu } from "../common/PopupMenu";
import { colors } from "../../styles/tokens/colors";
import { useState } from "react";
import { PersonalTodoButton } from "./SideBar/PersonalTodoButton";
import { ListSection } from "./SideBar/ListSection";
import { CreateTeamModal } from "./SideBar/CreateTeamModal";
import { InviteModal } from "./SideBar/InviteModal";
import { DeleteTeamModal } from "./SideBar/DeleteTeamModal";
import { usePopupMenu } from "../../hooks/usePopupMenu";

interface Team {
    id: number;
    name: string;
}

export const Sidebar = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [invitations, setInvitations] = useState([
        { id: 1, teamName: "프론트엔드 스터디" },
        { id: 2, teamName: "알고리즘 스터디" }
    ]);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteInput, setInviteInput] = useState("");
    const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const teamMenu = usePopupMenu();
    const inviteMenu = usePopupMenu();

    const handleCreateTeam = () => {
        if (!newTeamName.trim()) return;
        setTeams(prev => [
            ...prev,
            { id: Date.now(), name: newTeamName }
        ]);
        setNewTeamName("");
        setIsModalOpen(false);
    };

    const menuItems = [
        {
            label: "팀 초대하기",
            onClick: () => {
                teamMenu.closeMenu();
                setIsInviteModalOpen(true);
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
            onClick: () => {
                const invite = invitations.find(inv => inv.id === inviteMenu.selectedId);
                if (invite) {
                    setTeams(prev => [...prev, { id: Date.now(), name: invite.teamName }]);
                    setInvitations(prev => prev.filter(inv => inv.id !== inviteMenu.selectedId));
                }
                inviteMenu.closeMenu();
            }
        },
        {
            label: "초대 거절",
            onClick: () => {
                setInvitations(prev => prev.filter(inv => inv.id !== inviteMenu.selectedId));
                inviteMenu.closeMenu();
            }
        }
    ];

    const handleInvite = () => {
        if (!inviteInput.trim()) return;
        setInvitedMembers(prev => [...prev, inviteInput.trim()]);
        setInviteInput("");
    };

    const handleRemoveInvited = (name: string) => {
        setInvitedMembers(prev => prev.filter(n => n !== name));
    };

    return (
        <Container>
            <PersonalTodoButton />
            <ListSection
                title="내 팀 목록"
                items={teams}
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
                onConfirm={() => {
                    setTeams(prev => prev.filter(team => team.id !== teamMenu.selectedId));
                    setIsDeleteModalOpen(false);
                }}
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


