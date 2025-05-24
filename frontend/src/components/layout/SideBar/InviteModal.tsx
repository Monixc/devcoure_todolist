import { Modal } from "../../common/Modal";
import { TextField } from "../../common/TextField";
import { Button } from "../../common/Button";
import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import { colors } from "../../../styles/tokens/colors";

interface Props {
  isOpen: boolean;
  inviteInput: string;
  invitedMembers: string[];
  onInputChange: (v: string) => void;
  onInvite: () => void;
  onRemoveInvited: (name: string) => void;
  onClose: () => void;
}

export const InviteModal = ({ isOpen, inviteInput, invitedMembers, onInputChange, onInvite, onRemoveInvited, onClose }: Props) => (
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
        style={{ marginLeft: 8 }}
      >
        초대
      </Button>
    </InviteRow>
    <InviteList>
      {invitedMembers.map(name => (
        <InviteItem key={name}>
          <span>{name}</span>
          <FiTrash2
            size={18}
            color={colors.red[500]}
            style={{ cursor: "pointer" }}
            onClick={() => onRemoveInvited(name)}
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