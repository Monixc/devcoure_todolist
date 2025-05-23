import { prisma } from "../../config/db";
import { TODOS_CONSTANTS } from "../../constants/todos.constants";
import type { CreateTodoDto, UpdateTodoDto } from "../../types/todos.types";


const createPersonalTodo = async (
  { title }: CreateTodoDto, 
  userId: string
) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED);
  }

  return await prisma.personal_todos.create({
    data: {
      title,
      fk_user_id: user.id,
    },
  });
};

const getPersonalTodos = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED);
  }

  return await prisma.personal_todos.findMany({
    where: {
      fk_user_id: user.id,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
};

const updatePersonalTodo = async (
  todoId: number, 
  { title }: UpdateTodoDto, 
  userId: string
) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED);
  }

  const todo = await prisma.personal_todos.findFirst({
    where: {
      id: todoId,
      fk_user_id: user.id,
    },
  });

  if (!todo) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  return await prisma.personal_todos.update({
    where: {
      id: todoId,
    },
    data: {
      title,
      updated_at: new Date(),
    },
  });
};

const deletePersonalTodo = async (todoId: number, userId: string) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED);
  }

  const todo = await prisma.personal_todos.findFirst({
    where: {
      id: todoId,
      fk_user_id: user.id,
    },
  });

  if (!todo) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  return await prisma.personal_todos.delete({
    where: {
      id: todoId,
    },
  });
};

const togglePersonalTodoComplete = async (todoId: number, userId: string) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED);
  }

  const todo = await prisma.personal_todos.findFirst({
    where: {
      id: todoId,
      fk_user_id: user.id,
    },
  });

  if (!todo) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  return await prisma.personal_todos.update({
    where: {
      id: todoId,
    },
    data: {
      isCompleted: !todo.isCompleted,
      updated_at: new Date(),
    },
  });
};

const createTeamTodo = async (
  { title }: CreateTodoDto, 
  teamId: number
) => {
  return await prisma.team_todos.create({
    data: {
      title,
      fk_team_id: teamId,
    },
  });
};

const getTeamTodos = async (teamId: number) => {
  return await prisma.team_todos.findMany({
    where: {
      fk_team_id: teamId,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
};

const updateTeamTodo = async (
  todoId: number, 
  { title }: UpdateTodoDto, 
  teamId: number
) => {
  const todo = await prisma.team_todos.findFirst({
    where: {
      id: todoId,
      fk_team_id: teamId,
    },
  });

  if (!todo) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  return await prisma.team_todos.update({
    where: {
      id: todoId,
    },
    data: {
      title,
      updated_at: new Date(),
    },
  });
};

const deleteTeamTodo = async (todoId: number, teamId: number) => {
  const todo = await prisma.team_todos.findFirst({
    where: {
      id: todoId,
      fk_team_id: teamId,
    },
  });

  if (!todo) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  return await prisma.team_todos.delete({
    where: {
      id: todoId,
    },
  });
};

const toggleTeamTodoComplete = async (todoId: number, teamId: number) => {
  const todo = await prisma.team_todos.findFirst({
    where: {
      id: todoId,
      fk_team_id: teamId,
    },
  });

  if (!todo) {
    throw new Error(TODOS_CONSTANTS.ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  return await prisma.team_todos.update({
    where: {
      id: todoId,
    },
    data: {
      isCompleted: !todo.isCompleted,
      updated_at: new Date(),
    },
  });
};

export {
  createPersonalTodo,
  getPersonalTodos,
  updatePersonalTodo,
  deletePersonalTodo,
  togglePersonalTodoComplete,
  createTeamTodo,
  getTeamTodos,
  updateTeamTodo,
  deleteTeamTodo,
  toggleTeamTodoComplete,
}; 