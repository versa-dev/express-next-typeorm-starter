import { Body, Controller, Post, Route } from "tsoa";
import { User } from "src/entities/User";
import { hashPassword } from "src/utils/password";

@Route("auth")
export class AuthController extends Controller {
  @Post("/register")
  async registerUser(@Body() user: User): Promise<void> {
    // Hash the user's password before storing it
    const hashedPassword = await hashPassword(user.password);

    // Save the user to the database
    user.password = hashedPassword;
    await user.save();
  }
}
