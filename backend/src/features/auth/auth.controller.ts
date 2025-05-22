import { Request, Response } from "express";
import * as authService from "./auth.service";
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

const login = async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Id, password를 입력해주세요",
      });
    }

    const result = await authService.loginUser({ userId, password });
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "존재하지 않는 사용자입니다." ||
        error.message === "비밀번가 일치하지 않습니다"
      ) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
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

const getRefreshToken = (req: Request, res: Response) => {};

const logout = (req: Request, res: Response) => {};

const getSession = (req: Request, res: Response) => {};

const sendEmai = (req: Request, res: Response) => {};

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
