import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "토큰이 없습니다.",
    });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await prisma.users.findUnique({
      where: {
        userId: decoded.id,
      },
    });

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "유저를 찾을 수 없습니다",
      });
      return;
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "유효하지 않은 토큰입니다.",
    });
    return;
  }
};

export default authMiddleware;
