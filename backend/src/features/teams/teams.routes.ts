import express from "express";
import * as teamsController from "./teams.controller";
import jwtAuthMiddleware from "../../middlewares/auth/jwt.middleware";
import { isTeamLeader, isTeamMember } from "../../middlewares/permissions/team-permission.middleware";

const teamsRouter = express.Router();
teamsRouter.post("/", jwtAuthMiddleware, teamsController.createTeam);
teamsRouter.get("/", jwtAuthMiddleware, teamsController.getTeams);
teamsRouter.post("/:teamId/invite", jwtAuthMiddleware, isTeamLeader, teamsController.inviteTeam);
teamsRouter.post("/invitations/:inviteId/accept", jwtAuthMiddleware, teamsController.acceptInvite);
teamsRouter.post("/invitations/:inviteId/reject", jwtAuthMiddleware, teamsController.rejectInvite);
teamsRouter.post("/:teamId/leave", jwtAuthMiddleware, teamsController.leaveTeam);
teamsRouter.delete("/:teamId", jwtAuthMiddleware, isTeamLeader, teamsController.deleteTeam);
teamsRouter.patch("/:teamId", jwtAuthMiddleware, isTeamLeader, teamsController.updateTeam);
teamsRouter.delete("/:teamId/members/:memberId", jwtAuthMiddleware, isTeamLeader, teamsController.kickMember);
teamsRouter.get("/:teamId/members", jwtAuthMiddleware, isTeamMember, teamsController.getTeamMembers);
teamsRouter.get("/invitations", jwtAuthMiddleware, teamsController.getInvitations);
teamsRouter.get("/:teamId/invitations", jwtAuthMiddleware, isTeamMember, teamsController.getTeamInvitations);
teamsRouter.delete("/invitations/:inviteId", jwtAuthMiddleware, teamsController.deleteInvitation);

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: 팀 관련 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         leaderId:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     TeamMember:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         role:
 *           type: string
 *           enum: [LEADER, MEMBER]
 *     TeamInvitation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         teamId:
 *           type: string
 *         inviterId:
 *           type: string
 *         inviteeId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [PENDING, ACCEPTED, REJECTED]
 */



/**
 * @swagger
 * /teams:
 *   post:
 *     summary: 새 팀 생성
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: 팀 이름
 *     responses:
 *       201:
 *         description: 팀 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       401:
 *         description: 인증되지 않은 사용자
 */


/**
 * @swagger
 * /teams:
 *   get:
 *     summary: 내 팀 목록 조회
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 팀 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       401:
 *         description: 인증되지 않은 사용자
 */


/**
 * @swagger
 * /teams/{teamId}/invite:
 *   post:
 *     summary: 팀원 초대
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: 초대 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamInvitation'
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀 또는 사용자를 찾을 수 없음
 */

/**
 * @swagger
 * /teams/invitations/{inviteId}/accept:
 *   post:
 *     summary: 팀 초대 수락
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inviteId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 초대 수락 성공
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 초대를 찾을 수 없음
 */

/**
 * @swagger
 * /teams/invitations/{inviteId}/reject:
 *   post:
 *     summary: 팀 초대 거절
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inviteId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 초대 거절 성공
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 초대를 찾을 수 없음
 */

/**
 * @swagger
 * /teams/{teamId}/leave:
 *   post:
 *     summary: 팀 탈퇴
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 팀 탈퇴 성공
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀을 찾을 수 없음
 */

/**
 * @swagger
 * /teams/{teamId}:
 *   delete:
 *     summary: 팀 삭제
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 팀 삭제 성공
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀을 찾을 수 없음
 */

/**
 * @swagger
 * /teams/{teamId}:
 *   patch:
 *     summary: 팀 정보 수정
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: 팀 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀을 찾을 수 없음
 */

/**
 * @swagger
 * /teams/{teamId}/members/{memberId}:
 *   delete:
 *     summary: 팀원 강퇴
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 팀원 강퇴 성공
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀 또는 멤버를 찾을 수 없음
 */

/**
 * @swagger
 * /teams/{teamId}/members:
 *   get:
 *     summary: 팀원 목록 조회
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 팀원 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamMember'
 *       401:
 *         description: 권한 없음
 *       404:
 *         description: 팀을 찾을 수 없음
 */

export default teamsRouter;
