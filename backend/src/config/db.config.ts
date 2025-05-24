import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("데이터베이스 연결 성공");
  } catch (error) {
    console.error("데이터베이스 연결 실패:", error);
    process.exit(1);
  }
};
