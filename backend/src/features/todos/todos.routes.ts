import express from "express";
import * as todosController from "./todos.controller";
import authMiddleware from "../auth/auth.middleware";
import { isTeamMember, isTeamLeader } from "../teams/team-auth.middleware";

const todosRouter = express.Router();


todosRouter.post("/", authMiddleware, todosController.createPersonalTodo);
todosRouter.get("/", authMiddleware, todosController.getPersonalTodos);
todosRouter.patch("/:todoId", authMiddleware, todosController.updatePersonalTodo);
todosRouter.delete("/:todoId", authMiddleware, todosController.deletePersonalTodo);
todosRouter.patch("/:todoId/toggle", authMiddleware, todosController.togglePersonalTodoComplete);

todosRouter.post("/team/:teamId", authMiddleware, isTeamMember, todosController.createTeamTodo);
todosRouter.get("/team/:teamId", authMiddleware, isTeamMember, todosController.getTeamTodos);
todosRouter.patch("/team/:teamId/:todoId", authMiddleware, isTeamMember, todosController.updateTeamTodo);
todosRouter.delete("/team/:teamId/:todoId", authMiddleware, isTeamLeader, todosController.deleteTeamTodo);
todosRouter.patch("/team/:teamId/:todoId/toggle", authMiddleware, isTeamMember, todosController.toggleTeamTodoComplete);

export default todosRouter; 