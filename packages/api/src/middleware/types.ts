import { User } from "@/db/entities/User";
import { Request } from "express";

export class AuthenticateError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
  }
}

export class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
  }
}

export enum HttpStatusCodes {
  /** The request succeeded. */
  OK = 200,
  /** The request succeeded, and a new resource was created as a result */
  CREATED = 201,
  /**
   * There is no content to send for this request.
   * Usually used when deleting something.
   */
  NO_CONTENT = 204,
  /** The request is not authenticated. */
  UNAUTHORIZED = 401,
  /**
   * The request is authenticated but not authorized.
   * In other words, the client doesn't have access to the requested resource.
   */
  FORBIDDEN = 403,
  /** The requested resource was not found. */
  NOT_FOUND = 404,
  /** The request conflicts with an existing rule. */
  CONFLICT = 409,
  /** The request has validation errors. */
  UNPROCESSABLE_ENTITY = 422,
  /** Internal Server Error */
  SERVER_ERROR = 500,
}

export type AuthenticatedRequest = Request & {
  user?: User;
};

/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;
