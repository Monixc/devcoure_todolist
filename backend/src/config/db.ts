import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("DB 연결 성공");
  } catch (error) {
    console.log("DB 연결 실패");
    console.log(error);
    // @ts-ignore
    process.exit(1);
  }
}

export { connectDB };
