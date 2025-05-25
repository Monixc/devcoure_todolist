import { Modal } from "../../common/Modal";
import { TextField } from "../../common/TextField";
import { Button } from "../../common/Button";
import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import { colors } from "../../../styles/tokens/colors";

interface InviteModalProps {
  isOpen: boolean;
  inviteInput: string;
  invitedMembers: { id: string; userId: string }[];
  onInputChange: (v: string) => void;
  onInvite: () => void;
  onRemoveInvited: (inviteId: string) => void;
  onClose: () => void;
}

export const InviteModal = ({ isOpen, inviteInput, invitedMembers, onInputChange, onInvite, onRemoveInvited, onClose }: InviteModalProps) => (
  <Modal
    isOpen={isOpen}
    onConfirm={onClose}
    onCancel={onClose}
    title="팀원 초대"
    confirmText="닫기"
    cancelText="취소"
  >
    <InviteRow>
      <TextField
        value={inviteInput}
        onChange={e => onInputChange(e.target.value)}
        placeholder="이름을 입력하세요"
        fullWidth
      />
      <Button
        variant="slate-filled"
        size="sm"
        onClick={onInvite}
      >
        초대
      </Button>
    </InviteRow>
    <InviteList>
      {invitedMembers.map(member => (
        <InviteItem key={member.id}>
          <span>{member.userId}</span>
          <FiTrash2
            size={18}
            color={colors.red[500]}
            style={{ cursor: "pointer" }}
            onClick={() => onRemoveInvited(member.id)}
          />
        </InviteItem>
      ))}
    </InviteList>
  </Modal>
);

const InviteRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;
const InviteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InviteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 15px;
`; 