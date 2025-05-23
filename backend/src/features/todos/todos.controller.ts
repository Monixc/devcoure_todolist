import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as todosService from "./todos.service";
import { TODOS_CONSTANTS } from "../../constants/todos.constants";

const createPersonalTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const todo = await todosService.createPersonalTodo({ title }, user.userId);
    res.status(StatusCodes.CREATED).json({
      todo,
      message: TODOS_CONSTANTS.MESSAGES.TODO_CREATED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getPersonalTodos = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const todos = await todosService.getPersonalTodos(user.userId);
    res.status(StatusCodes.OK).json(todos);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const updatePersonalTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title } = req.body;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const todo = await todosService.updatePersonalTodo(
      Number(todoId), 
      { title }, 
      user.userId
    );
    res.status(StatusCodes.OK).json({
      todo,
      message: TODOS_CONSTANTS.MESSAGES.TODO_UPDATED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const deletePersonalTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    await todosService.deletePersonalTodo(Number(todoId), user.userId);
    res.status(StatusCodes.OK).json({
      message: TODOS_CONSTANTS.MESSAGES.TODO_DELETED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const togglePersonalTodoComplete = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: TODOS_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }

  try {
    const todo = await todosService.togglePersonalTodoComplete(Number(todoId), user.userId);
    res.status(StatusCodes.OK).json({
      todo,
      message: todo.isCompleted 
        ? TODOS_CONSTANTS.MESSAGES.TODO_COMPLETED 
        : TODOS_CONSTANTS.MESSAGES.TODO_UNCOMPLETED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const createTeamTodo = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { title } = req.body;

  try {
    const todo = await todosService.createTeamTodo({ title }, Number(teamId));
    res.status(StatusCodes.CREATED).json({
      todo,
      message: TODOS_CONSTANTS.MESSAGES.TODO_CREATED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getTeamTodos = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const todos = await todosService.getTeamTodos(Number(teamId));
    res.status(StatusCodes.OK).json(todos);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const updateTeamTodo = async (req: Request, res: Response) => {
  const { teamId, todoId } = req.params;
  const { title } = req.body;

  try {
    const todo = await todosService.updateTeamTodo(
      Number(todoId), 
      { title }, 
      Number(teamId)
    );
    res.status(StatusCodes.OK).json({
      todo,
      message: TODOS_CONSTANTS.MESSAGES.TODO_UPDATED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const deleteTeamTodo = async (req: Request, res: Response) => {
  const { teamId, todoId } = req.params;

  try {
    await todosService.deleteTeamTodo(Number(todoId), Number(teamId));
    res.status(StatusCodes.OK).json({
      message: TODOS_CONSTANTS.MESSAGES.TODO_DELETED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const toggleTeamTodoComplete = async (req: Request, res: Response) => {
  const { teamId, todoId } = req.params;

  try {
    const todo = await todosService.toggleTeamTodoComplete(Number(todoId), Number(teamId));
    res.status(StatusCodes.OK).json({
      todo,
      message: todo.isCompleted 
        ? TODOS_CONSTANTS.MESSAGES.TODO_COMPLETED 
        : TODOS_CONSTANTS.MESSAGES.TODO_UNCOMPLETED,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
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