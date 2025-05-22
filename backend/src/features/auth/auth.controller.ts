import { Request, Response } from "express";
import * as authService from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";

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
      if (
        error.message === AUTH_CONSTANTS.EMAIL.ERROR_MESSAGES.DUPLICATE_EMAIL
      ) {
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
      message: "알 수 없는 오류가 발생했습니다",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: AUTH_CONSTANTS.LOGIN.ERROR_MESSAGES.MISSING_CREDENTIALS,
      });
    }

    const user = await authService.loginUser({ userId, password });
    return res.status(StatusCodes.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === AUTH_CONSTANTS.LOGIN.ERROR_MESSAGES.USER_NOT_FOUND ||
        error.message ===
          AUTH_CONSTANTS.LOGIN.ERROR_MESSAGES.INVALID_CREDENTIALS
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
