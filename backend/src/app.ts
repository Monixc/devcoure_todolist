import express from "express";
import { prisma, connectDB } from "./config/db.js";
import authRouter from "./features/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

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
