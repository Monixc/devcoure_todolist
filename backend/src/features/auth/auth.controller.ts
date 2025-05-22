import { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { StatusCodes } from "http-status-codes";

const join = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await authService.joinUser(userData);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "이미 존재하는 이메일입니다.") {
        return res.status(StatusCodes.CONFLICT).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }
};

const login = (req: Request, res: Response) => {};

const getRefreshToken = (req: Request, res: Response) => {};

const logout = (req: Request, res: Response) => {};

const getSession = (req: Request, res: Response) => {};

const sendEmai = (req: Request, rest: Response) => {};

const isEmailVerified = (req: Request, res: Response) => {};

const getEmailStatus = (req: Request, res: Response) => {};

const isValidEmail = (req: Request, res: Response) => {};

export {
  join,
  login,
  getRefreshToken,
  logout,
  getSession,
  sendEmai,
  isEmailVerified,
  getEmailStatus,
  isValidEmail,
};
