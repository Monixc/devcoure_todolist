import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: AUTH_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED,
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
        message: AUTH_CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN,
    });
    return;
  }
};

export default authMiddleware;
