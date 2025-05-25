import { Modal } from "../../../common/Modal";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteTeamModal = ({ isOpen, onConfirm, onCancel }: Props) => (
  <Modal
    isOpen={isOpen}
    onConfirm={onConfirm}
    onCancel={onCancel}
    title="정말로 삭제하시겠습니까?"
    confirmText="확인"
    cancelText="취소"
  />
); 