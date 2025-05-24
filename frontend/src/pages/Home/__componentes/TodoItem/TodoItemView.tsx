import { Button } from "../../../../components/common/Button";
import { Checkbox } from "../../../../components/common/Checkbox";
import styled from "styled-components";
import { colors } from "../../../../styles/tokens/colors";

interface Props {
  checked: boolean;
  label: string;
  onCheck: () => void;
  onEdit?: () => void;
  onDelete: () => void;
  done?: boolean; 
}

export default function TodoItemView({ checked, label, onCheck, onEdit, onDelete, done }: Props) {
  return (
    <Row>
      <Checkbox
        checked={checked}
        label={<Label $done={done}>{label}</Label>}
        onChange={onCheck}
      />
      <ButtonWrap>
        {!done && (
          <Button variant="slate-filled" size="sm" onClick={onEdit}>수정</Button>
        )}
        <Button variant="red-outlined" size="sm" onClick={onDelete}>삭제</Button>
      </ButtonWrap>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 8px 0;
  width: 100%;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const Label = styled.span<{ $done?: boolean }>`
  color: ${({ $done }) => $done ? colors.gray[600] : "inherit"};
  flex: 1;
  word-break: break-all;
`;