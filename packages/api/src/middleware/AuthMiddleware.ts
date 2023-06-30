import { NextFunction, Request, Response } from "express";
import { verifyToken } from "src/utils/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error();
    // Verify the token
    const decodedToken = verifyToken(token);

    // Attach the user object to the request for future use
    //@ts-ignore
    req.user = decodedToken.user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
