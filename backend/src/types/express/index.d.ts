import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
    };
  }
}

declare module "express" {
  interface Request {
    cookies: { [key: string]: string };
  }
}
