import { useState } from "react";
import { Button } from "../../../../components/common/Button";
import styled from "styled-components";
import { TextField } from "../../../../components/common/TextField";

interface Props {
  value: string;
  onSubmit: (newValue: string) => void;
  onCancel: () => void;
}

export default function TodoItemEdit({ value, onSubmit, onCancel }: Props) {
  const [editValue, setEditValue] = useState(value);

  return (
    <Row>
      <TextField
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        fullWidth={true}
      />
      <ButtonWrap>
        <Button variant="slate-filled" size="sm" onClick={() => onSubmit(editValue)}>완료</Button>
        <Button variant="gray-outlined" size="sm" onClick={onCancel}>취소</Button>
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
  gap: 8px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 8px;
`;