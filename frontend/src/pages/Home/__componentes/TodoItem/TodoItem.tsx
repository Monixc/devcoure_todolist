import TodoItemView from "./TodoItemView";
import TodoItemEdit from "./TodoItemEdit";
import type { Todo } from "../..";

interface Props {
  todo: Todo;
  isEdit: boolean;
  onCheck: () => void;
  onEdit?: (newValue: string) => void;
  onEditClick?: () => void;
  onCancelEdit?: () => void;
  onDelete: () => void;
  done: boolean;
}

export default function TodoItem({
  todo, isEdit, onCheck, onEdit, onEditClick, onCancelEdit, onDelete, done
}: Props) {
  if (isEdit && !done) {
    return (
      <TodoItemEdit
        value={todo.text}
        onSubmit={onEdit!}
        onCancel={onCancelEdit!}
      />
    );
  }
  return (
    <TodoItemView
      checked={todo.checked}
      label={todo.text}
      onCheck={onCheck}
      onEdit={done ? undefined : onEditClick}
      onDelete={onDelete}
      done={done}
    />
  );
}