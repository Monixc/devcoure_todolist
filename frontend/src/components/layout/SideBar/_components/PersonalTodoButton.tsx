import { Button } from "../../../common/Button";

interface PersonalTodoButtonProps {
  onClick?: () => void;
  active?: boolean;
}

export const PersonalTodoButton = ({ onClick, active }: PersonalTodoButtonProps) => (
  <Button size="full" variant="gray-filled" active={active} onClick={onClick}>개인 할 일</Button>
); 