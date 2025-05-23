import express from "express";
import { connectDB } from "./config/db.config";
import { securityMiddleware } from "./middlewares/security";
import authRouter from "./features/auth/auth.routes";
import teamsRouter from "./features/teams/teams.routes";
import todosRouter from "./features/todos/todos.routes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';

const app = express();

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 보안 미들웨어 적용
app.use(securityMiddleware);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 라우터
app.use("/auth", authRouter);
app.use("/teams", teamsRouter);
app.use("/todos", todosRouter);

// 루트 경로 처리
app.get("/", (req, res) => {
  res.send("서버가 실행 중입니다!");
});

// 404 처리
app.use((req, res) => {
  console.log(`404 NOT FOUND: ${req.method} ${req.url}`);
  res.status(404).send("요청한 페이지를 찾을 수 없습니다.");
});

connectDB();

export default app;
