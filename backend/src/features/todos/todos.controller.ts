import { Request, Response } from "express";
import * as todosService from "./todos.service";
import { StatusCodes } from "http-status-codes";

const createPersonalTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const user = req.user;

  if (!user) {
     res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    const todo = await todosService.createPersonalTodo(title, user.userId);
    res.status(StatusCodes.CREATED).json(todo);
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const getPersonalTodos = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
     res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    const todos = await todosService.getPersonalTodos(user.userId);
    res.status(StatusCodes.OK).json(todos);
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const updatePersonalTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title } = req.body;
  const user = req.user;

  if (!user) {
     res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    const todo = await todosService.updatePersonalTodo(Number(todoId), title, user.userId);
    res.status(StatusCodes.OK).json(todo);
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const deletePersonalTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const user = req.user;

  if (!user) {
     res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    await todosService.deletePersonalTodo(Number(todoId), user.userId);
    res.status(StatusCodes.OK).json({
      message: "Todo가 삭제되었습니다.",
    });
    return;
      } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const togglePersonalTodoComplete = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const user = req.user;

  if (!user) {
     res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    const todo = await todosService.togglePersonalTodoComplete(Number(todoId), user.userId);
    res.status(StatusCodes.OK).json(todo);
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const createTeamTodo = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { title } = req.body;

  try {
    const todo = await todosService.createTeamTodo(title, Number(teamId));
    res.status(StatusCodes.CREATED).json(todo);
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const getTeamTodos = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const todos = await todosService.getTeamTodos(Number(teamId));
    res.status(StatusCodes.OK).json(todos);
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const updateTeamTodo = async (req: Request, res: Response) => {
  const { teamId, todoId } = req.params;
  const { title } = req.body;

  try {
    const todo = await todosService.updateTeamTodo(Number(todoId), title, Number(teamId));
    res.status(StatusCodes.OK).json(todo);   
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const deleteTeamTodo = async (req: Request, res: Response) => {
  const { teamId, todoId } = req.params;

  try {
    await todosService.deleteTeamTodo(Number(todoId), Number(teamId));
    res.status(StatusCodes.OK).json({
      message: "Todo가 삭제되었습니다.",
    });
    return;
    } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
  }
};

const toggleTeamTodoComplete = async (req: Request, res: Response) => {
  const { teamId, todoId } = req.params;

  try {
    const todo = await todosService.toggleTeamTodoComplete(Number(todoId), Number(teamId));
    res.status(StatusCodes.OK).json(todo);
    return;
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
    return;
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