import { Modal } from "../../common/Modal";
import { TextField } from "../../common/TextField";

interface Props {
  isOpen: boolean;
  newTeamName: string;
  onChange: (v: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CreateTeamModal = ({ isOpen, newTeamName, onChange, onConfirm, onCancel }: Props) => (
  <Modal
    isOpen={isOpen}
    onConfirm={onConfirm}
    onCancel={onCancel}
    title="팀 만들기"
    confirmText="만들기"
    cancelText="취소"
  >
    <TextField
      value={newTeamName}
      onChange={e => onChange(e.target.value)}
      placeholder="팀 이름을 입력해주세요."
      fullWidth
    />
  </Modal>
); 