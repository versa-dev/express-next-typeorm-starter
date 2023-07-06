import { User, UserRole } from "@/db/entities/User";
import { HttpStatusCodes, NotFoundError } from "@/middleware/types";
import {
  Controller,
  Delete,
  Get,
  Path,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import { UserDto } from "../AuthController/types";

@Route("users")
export class UserController extends Controller {
  @SuccessResponse(HttpStatusCodes.NO_CONTENT)
  @Security("role", [UserRole.SUPER_ADMIN])
  @Delete("{userId}")
  async deleteUser(@Path() userId: string): Promise<void> {
    const user = await User.findOne({ where: { uuid: userId } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await user.remove();
  }

  @Security("role", [UserRole.SUPER_ADMIN])
  @Get()
  async getAdminUsers(): Promise<UserDto[]> {
    const users = await User.find({ where: { role: UserRole.ADMIN } });

    return users.map(
      (user): UserDto => ({
        id: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    );
  }
}
