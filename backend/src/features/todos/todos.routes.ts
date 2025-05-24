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

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: 할일 관련 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         title:
 *           type: string
 *         isCompleted:
 *           type: boolean
 *           default: false
 *         userId:
 *           type: integer
 *           format: int32
 *         teamId:
 *           type: integer
 *           format: int32
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /todos:
 *   post:
 *     summary: 개인 할일 생성
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: 할일 제목
 *     responses:
 *       201:
 *         description: 할일 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 할일이 생성되었습니다.
 *       401:
 *         description: 인증되지 않은 사용자
 *       400:
 *         description: 잘못된 요청
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: 개인 할일 목록 조회
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 할일 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 할일 목록을 조회했습니다.
 *       401:
 *         description: 인증되지 않은 사용자
 */

/**
 * @swagger
 * /todos/{todoId}:
 *   patch:
 *     summary: 개인 할일 수정
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: 수정할 할일 제목
 *     responses:
 *       200:
 *         description: 할일 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 할일이 수정되었습니다.
 *       401:
 *         description: 인증되지 않은 사용자
 *       404:
 *         description: 할일을 찾을 수 없음
 */

/**
 * @swagger
 * /todos/{todoId}:
 *   delete:
 *     summary: 개인 할일 삭제
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     responses:
 *       200:
 *         description: 할일 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 할일이 삭제되었습니다.
 *       401:
 *         description: 인증되지 않은 사용자
 *       404:
 *         description: 할일을 찾을 수 없음
 */

/**
 * @swagger
 * /todos/{todoId}/toggle:
 *   patch:
 *     summary: 개인 할일 완료 상태 토글
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     responses:
 *       200:
 *         description: 할일 상태 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 할일 상태가 변경되었습니다.
 *       401:
 *         description: 인증되지 않은 사용자
 *       404:
 *         description: 할일을 찾을 수 없음
 */

/**
 * @swagger
 * /todos/team/{teamId}:
 *   post:
 *     summary: 팀 할일 생성
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: 할일 제목
 *     responses:
 *       201:
 *         description: 팀 할일 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 팀 할일이 생성되었습니다.
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀을 찾을 수 없음
 */

/**
 * @swagger
 * /todos/team/{teamId}:
 *   get:
 *     summary: 팀 할일 목록 조회
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *     responses:
 *       200:
 *         description: 팀 할일 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 팀 할일 목록을 조회했습니다.
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀을 찾을 수 없음
 */

/**
 * @swagger
 * /todos/team/{teamId}/{todoId}:
 *   patch:
 *     summary: 팀 할일 수정
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: 수정할 할일 제목
 *     responses:
 *       200:
 *         description: 팀 할일 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 팀 할일이 수정되었습니다.
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀 또는 할일을 찾을 수 없음
 */

/**
 * @swagger
 * /todos/team/{teamId}/{todoId}:
 *   delete:
 *     summary: 팀 할일 삭제
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     responses:
 *       200:
 *         description: 팀 할일 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 팀 할일이 삭제되었습니다.
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀 또는 할일을 찾을 수 없음
 */

/**
 * @swagger
 * /todos/team/{teamId}/{todoId}/toggle:
 *   patch:
 *     summary: 팀 할일 완료 상태 토글
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     responses:
 *       200:
 *         description: 팀 할일 상태 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: 팀 할일 상태가 변경되었습니다.
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀 또는 할일을 찾을 수 없음
 */

export default todosRouter; 