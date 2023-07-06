import { Request } from "express";
import auth from "basic-auth";
import { User } from "@/db/entities/User";
import { AuthenticateError, ForbiddenError } from "@/middleware/types";
import logger from "@/utils/logger";
import { verifyToken } from "@/utils/auth";

const isSuperAdmin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const superAdminUserName = process.env.SUPER_ADMIN_USERNAME;
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (!superAdminPassword || !superAdminUserName) {
    logger.error("Super Admin credentials are not set yet");
    return false;
  }

  return username === superAdminUserName && password === superAdminPassword;
};

const canUserAccessRoute = (user: User, scopes: string[]) => {
  if (scopes.length === 0 || scopes.some((role) => user.role === role)) {
    return true;
  }

  return false;
};

export async function expressAuthentication(
  req: Request,
  securityName: string,
  scopes?: string[]
): Promise<User | undefined> {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Basic ")) {
    const basicAuthData = auth(req);

    if (!basicAuthData) {
      throw new AuthenticateError("Invalid credentials");
    }

    const { name: username, pass: password } = basicAuthData;

    if (isSuperAdmin({ username, password })) {
      return;
    } else {
      throw new AuthenticateError("Invalid credentials");
    }
  } else {
    const token = authHeader?.split(" ")[1];

    if (!token) throw new AuthenticateError();
    // Verify the token
    const decodedToken = verifyToken(token);

    // Attach the user object to the request for future use
    //@ts-ignore

    if (scopes && !canUserAccessRoute(decodedToken.user, scopes)) {
      throw new ForbiddenError();
    }

    return decodedToken.user;
  }
}
