import { Entity, Column } from "typeorm";
import { Base } from "./Base";

export enum UserStatus {
  PENDING = "PENDING",
  TRIAL = "TRIAL",
  SUSPEND = "SUSPEND",
  ACTIVE = "ACTIVE",
}

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

@Entity({ name: "users" })
export class User extends Base {
  @Column({
    type: "varchar",
    nullable: false,
  })
  name!: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  email!: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    nullable: false,
  })
  role!: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    nullable: false,
  })
  status!: UserStatus;
}
