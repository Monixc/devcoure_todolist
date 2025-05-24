import styled from "styled-components";
import { MainLayout } from "../../components/layout/MainLayout";
import { Sidebar } from "../../components/layout/SideBar";
import { TodoInput } from "./__componentes/TodoInput";

import { useState } from "react";
import TodoItem from "./__componentes/TodoItem/TodoItem";
import { colors } from "../../styles/tokens/colors";

export type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "데브코스 강의 수강하기", checked: false },
    { id: 2, text: "리액트 공부하기", checked: true },
  ]);
  const [editId, setEditId] = useState<number | null>(null);


  const handleSubmit = (todo: string) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: todo, checked: false }
    ]);
  };

  const handleCheck = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
    if (editId === id) setEditId(null);
  };

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    if (editId === id) setEditId(null);
  };

  const handleEdit = (id: number, newValue: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newValue } : todo
      )
    );
    setEditId(null);
  };

  const todosActive = todos.filter(todo => !todo.checked);
  const todosDone = todos.filter(todo => todo.checked);

  return (
    <MainLayout
      sidebar={<Sidebar />}
      main={
        <MainWrap>
          <TodoInput onSubmit={handleSubmit} />
          <SectionList>
            <section>
              <Title>TODO</Title>
              {todosActive.map(todo =>
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEdit={editId === todo.id}
                  onCheck={() => handleCheck(todo.id)}
                  onEdit={newValue => handleEdit(todo.id, newValue)}
                  onEditClick={() => setEditId(todo.id)}
                  onCancelEdit={() => setEditId(null)}
                  onDelete={() => handleDelete(todo.id)}
                  done={false}
                />
              )}
            </section>
            <section>
              <Title>DONE</Title>
              {todosDone.map(todo =>
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEdit={false}
                  onCheck={() => handleCheck(todo.id)}
                  onDelete={() => handleDelete(todo.id)}
                  done={true}
                />
              )}
            </section>
          </SectionList>
        </MainWrap>
      }
    />
  );
}

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const SectionList = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-right: 16px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[200]};
    border-radius: 4px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 24px 0 8px 0;
`;