import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { User, UserStatus } from "@/entities/User";
import {
  hashPassword,
  comparePassword,
  generateToken,
  generatePassword,
} from "src/utils/auth";
import type { LoginPayload, RegisterUserInput, UserDto } from "./types";
import { EmailSender } from "src";
import { ConflictError, NotFoundError } from "@/middleware/types";

@Route("auth")
export class AuthController extends Controller {
  @Post("/register")
  @SuccessResponse("201", "Created")
  async register(@Body() user: RegisterUserInput): Promise<void> {
    // Hash the user's password before storing it
    const oneTimePassword = generatePassword();
    const password = await hashPassword(oneTimePassword);
    const { name, email, role } = user;

    // Check if the user is already exist
    const userInDB = await User.findOne({ where: { email } });
    if (userInDB) {
      throw new ConflictError("User is already registered");
    }

    // Save the user to the database
    const newUser = await User.create({
      name,
      email,
      password,
      role,
      status: UserStatus.PENDING,
    }).save();

    // Sending email to the new user for one-time password
    await EmailSender.sendLoginEmail({
      firstName: user.name,
      to: user.email,
      password: oneTimePassword,
    });
  }

  @Post("/login")
  async login(
    @Body() credentials: { email: string; password: string }
  ): Promise<LoginPayload> {
    const { email, password } = credentials;

    // Find the user in the database by their email
    const user = await User.findOne({ where: { email } });

    // If the user doesn't exist or the password is incorrect, throw an error
    if (!user || !(await comparePassword(password, user.password))) {
      throw new NotFoundError("Invalid email or password");
    }

    const isFirstLogin = user.status === UserStatus.PENDING;
    // Generate a JWT token

    const token = generateToken(user);
    /**
     * @TODO should be updated after stripe integration
     */
    user.status = UserStatus.TRIAL;
    await user.save();

    const userDto: UserDto = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    return { token, user: userDto, isFirstLogin };
  }
}
