import styled from "styled-components";
import { MainLayout } from "../../components/layout/MainLayout";
import { Sidebar } from "../../components/layout/SideBar";
import { TodoInput } from "./__componentes/TodoInput";
import { useState, useEffect, useCallback } from "react";
import TodoItem from "./__componentes/TodoItem/TodoItem";
import { colors } from "../../styles/tokens/colors";
import * as todoApi from "../../services/todoApi";
import { EmptyMessage } from "../../components/common/EmptyMessage";

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

type SelectedType = "personal" | "team";

export default function Home() {
  const [selectedType, setSelectedType] = useState<SelectedType>("personal");
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 투두 목록 불러오기
  const fetchTodos = useCallback(async (type: SelectedType, teamId: number | null) => {
    setLoading(true);
    setError("");
    try {
      if (type === "personal") {
        const data = await todoApi.getPersonalTodos();
        setTodos(data);
      } else if (type === "team" && teamId) {
        const data = await todoApi.getTeamTodos(teamId);
        setTodos(data);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectPersonal = () => {
    setSelectedType("personal");
    setSelectedTeamId(null);
  };
  const handleSelectTeam = (teamId: number) => {
    setSelectedType("team");
    setSelectedTeamId(teamId);
  };

  useEffect(() => {
    fetchTodos(selectedType, selectedTeamId);
  }, [selectedType, selectedTeamId, fetchTodos]);

  // 투두 추가
  const handleSubmit = async (todo: string) => {
    setLoading(true);
    setError("");
    try {
      if (selectedType === "personal") {
        await todoApi.createPersonalTodo(todo);
        await fetchTodos("personal", null);
      } else if (selectedType === "team" && selectedTeamId) {
        await todoApi.createTeamTodo(selectedTeamId, todo);
        await fetchTodos("team", selectedTeamId);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 투두 체크
  const handleCheck = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      if (selectedType === "personal") {
        await todoApi.togglePersonalTodo(id);
        await fetchTodos("personal", null);
      } else if (selectedType === "team" && selectedTeamId) {
        await todoApi.toggleTeamTodo(selectedTeamId, id);
        await fetchTodos("team", selectedTeamId);
      }
      if (editId === id) setEditId(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 투두 삭제
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      if (selectedType === "personal") {
        await todoApi.deletePersonalTodo(id);
        await fetchTodos("personal", null);
      } else if (selectedType === "team" && selectedTeamId) {
        await todoApi.deleteTeamTodo(selectedTeamId, id);
        await fetchTodos("team", selectedTeamId);
      }
      if (editId === id) setEditId(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 투두 수정
  const handleEdit = async (id: number, newValue: string) => {
    setLoading(true);
    setError("");
    try {
      if (selectedType === "personal") {
        await todoApi.updatePersonalTodo(id, newValue);
        await fetchTodos("personal", null);
      } else if (selectedType === "team" && selectedTeamId) {
        await todoApi.updateTeamTodo(selectedTeamId, id, newValue);
        await fetchTodos("team", selectedTeamId);
      }
      setEditId(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const todosActive = todos.filter(todo => !todo.isCompleted);
  const todosDone = todos.filter(todo => todo.isCompleted);

  return (
    <MainLayout
      sidebar={<Sidebar onSelectPersonal={handleSelectPersonal} onSelectTeam={handleSelectTeam} activeType={selectedType} activeTeamId={selectedTeamId} />}
      main={
        <MainWrap>
          <TodoInput onSubmit={handleSubmit} />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {loading ? (
            <LoadingMsg>로딩 중...</LoadingMsg>
          ) : (
            <SectionList>
              <section>
                <Title>TODO</Title>
                {todosActive.length === 0 ? (
                  <EmptyMessage>아직 등록된 할 일이 없습니다. 새로운 할 일을 추가해보세요.</EmptyMessage>
                ) : (
                  todosActive.map(todo =>
                    <TodoItem
                      key={todo.id}
                      todo={{ id: todo.id, title: todo.title, isCompleted: todo.isCompleted }}
                      isEdit={editId === todo.id}
                      onCheck={() => handleCheck(todo.id)}
                      onEdit={newValue => handleEdit(todo.id, newValue)}
                      onEditClick={() => setEditId(todo.id)}
                      onCancelEdit={() => setEditId(null)}
                      onDelete={() => handleDelete(todo.id)}
                      done={false}
                    />
                  )
                )}
              </section>
              <section>
                <Title>DONE</Title>
                {todosDone.length === 0 ? (
                  <EmptyMessage>아직 완료된 할 일이 없습니다. 할 일을 완료해보세요.</EmptyMessage>
                ) : (
                  todosDone.map(todo =>
                    <TodoItem
                      key={todo.id}
                      todo={{ id: todo.id, title: todo.title, isCompleted: todo.isCompleted }}
                      isEdit={false}
                      onCheck={() => handleCheck(todo.id)}
                      onDelete={() => handleDelete(todo.id)}
                      done={true}
                    />
                  )
                )}
              </section>
            </SectionList>
          )}
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

const ErrorMsg = styled.div`
  color: ${colors.red[500]};
  font-size: 14px;
  margin-bottom: 4px;
`;

const LoadingMsg = styled.div`
  color: ${colors.gray[600]};
  font-size: 16px;
  margin: 24px 0;
`;