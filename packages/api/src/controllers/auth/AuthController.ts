import { Body, Controller, Post, Route } from "tsoa";
import { User, UserStatus } from "src/entities/User";
import {
  hashPassword,
  comparePassword,
  generateToken,
  generatePassword,
} from "src/utils/auth";

@Route("auth")
export class AuthController extends Controller {
  @Post("/register")
  async registerUser(@Body() user: User): Promise<void> {
    // Hash the user's password before storing it
    const oneTimePassword = generatePassword();
    const hashedPassword = await hashPassword(oneTimePassword);

    // Save the user to the database
    user.password = hashedPassword;
    user.status = UserStatus.PENDING;

    await user.save();
  }

  @Post("/login")
  async loginUser(
    @Body() credentials: { email: string; password: string }
  ): Promise<{ token: string }> {
    const { email, password } = credentials;

    // Find the user in the database by their email
    const user = await User.findOne({ where: { email } });

    // If the user doesn't exist or the password is incorrect, throw an error
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    // Generate a JWT token
    const token = generateToken(user);

    return { token };
  }
}
