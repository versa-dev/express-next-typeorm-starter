import logger from "@/utils/logger";
import {
  AuthenticateError,
  ConflictError,
  ForbiddenError,
  HttpStatusCodes,
} from "./types";
import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

/** @see https://tsoa-community.github.io/docs/error-handling.html#handling-validation-errors */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof AuthenticateError) {
    // @todo handle when security is not basic auth
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: err.message,
    });
  }

  if (err instanceof ForbiddenError) {
    return res.status(HttpStatusCodes.FORBIDDEN).json({
      message: err.message,
    });
  }

  if (err instanceof ValidateError) {
    logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof ConflictError) {
    return res.status(HttpStatusCodes.CONFLICT).json({
      message: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(HttpStatusCodes.SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }

  next();
}
