import api from "./api";
import { extractErrorMessage } from "../utils/error";

// 개인 투두 목록 조회
export async function getPersonalTodos() {
  try {
    const res = await api.get("/todos");
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 개인 투두 생성
export async function createPersonalTodo(title: string) {
  try {
    const res = await api.post("/todos", { title });
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 개인 투두 수정
export async function updatePersonalTodo(todoId: number, title: string) {
  try {
    const res = await api.patch(`/todos/${todoId}`, { title });
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 개인 투두 삭제
export async function deletePersonalTodo(todoId: number) {
  try {
    const res = await api.delete(`/todos/${todoId}`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 개인 투두 완료 토글
export async function togglePersonalTodo(todoId: number) {
  try {
    const res = await api.patch(`/todos/${todoId}/toggle`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 투두 목록 조회
export async function getTeamTodos(teamId: number) {
  try {
    const res = await api.get(`/todos/team/${teamId}`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 투두 생성
export async function createTeamTodo(teamId: number, title: string) {
  try {
    const res = await api.post(`/todos/team/${teamId}`, { title });
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 투두 수정
export async function updateTeamTodo(teamId: number, todoId: number, title: string) {
  try {
    const res = await api.patch(`/todos/team/${teamId}/${todoId}`, { title });
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 투두 삭제
export async function deleteTeamTodo(teamId: number, todoId: number) {
  try {
    const res = await api.delete(`/todos/team/${teamId}/${todoId}`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

// 팀 투두 완료 토글
export async function toggleTeamTodo(teamId: number, todoId: number) {
  try {
    const res = await api.patch(`/todos/team/${teamId}/${todoId}/toggle`);
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
} 