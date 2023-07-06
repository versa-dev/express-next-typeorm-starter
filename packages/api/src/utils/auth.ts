import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/db/entities/User";
import { AuthenticateError } from "@/middleware/types";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: User): string => {
  const payload = {
    id: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "4h" }); // Adjust the expiration time as needed

  return token;
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (error) {
    // Token verification failed
    throw new AuthenticateError("Invalid token");
  }
};

export const generatePassword = (): string => {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  let password = "";

  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  return password;
};
