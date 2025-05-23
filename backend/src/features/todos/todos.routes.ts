import express from "express";
import * as todosController from "./todos.controller";
import jwtAuthMiddleware from "../../middlewares/auth/jwt.middleware";
import { isTeamMember, isTeamLeader } from "../../middlewares/permissions/team-permission.middleware";
const todosRouter = express.Router();


todosRouter.post("/", jwtAuthMiddleware, todosController.createPersonalTodo);
todosRouter.get("/", jwtAuthMiddleware, todosController.getPersonalTodos);
todosRouter.patch("/:todoId", jwtAuthMiddleware, todosController.updatePersonalTodo);
todosRouter.delete("/:todoId", jwtAuthMiddleware, todosController.deletePersonalTodo);
todosRouter.patch("/:todoId/toggle", jwtAuthMiddleware, todosController.togglePersonalTodoComplete);

todosRouter.post("/team/:teamId", jwtAuthMiddleware, isTeamMember, todosController.createTeamTodo);
todosRouter.get("/team/:teamId", jwtAuthMiddleware, isTeamMember, todosController.getTeamTodos);
todosRouter.patch("/team/:teamId/:todoId", jwtAuthMiddleware, isTeamMember, todosController.updateTeamTodo);
todosRouter.delete("/team/:teamId/:todoId", jwtAuthMiddleware, isTeamLeader, todosController.deleteTeamTodo);
todosRouter.patch("/team/:teamId/:todoId/toggle", jwtAuthMiddleware, isTeamMember, todosController.toggleTeamTodoComplete);

export default todosRouter; 