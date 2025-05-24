import { Request, Response } from "express";
import * as authService from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";

const join = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await authService.joinUser(userData);

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: user,
      message: AUTH_CONSTANTS.MESSAGES.JOIN_SUCCESS,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === AUTH_CONSTANTS.ERROR_MESSAGES.DUPLICATE_EMAIL) {
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: AUTH_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: AUTH_CONSTANTS.ERROR_MESSAGES.MISSING_CREDENTIALS,
      });
      return;
    }

    const user = await authService.loginUser({ userId, password }, res);
    
    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
      message: AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === AUTH_CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND ||
        error.message === AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_PASSWORD
      ) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: error.message,
        });
        return;
      }
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
      return;
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: AUTH_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    console.log('Received refresh token:', refreshToken);
    
    if (!refreshToken) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN,
      });
      return;
    }

    const newAccessToken = await authService.refresh(req, res);

    res.status(StatusCodes.OK).json({
      success: true,
      data: newAccessToken,
      message: AUTH_CONSTANTS.MESSAGES.TOKEN_REFRESHED,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: error.message,
      });
      return;
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: AUTH_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export { join, login, refresh };
