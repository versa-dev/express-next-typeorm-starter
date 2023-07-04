import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

/**
 * ONLY USED AS BASE OBJECT FOR OTHER ENTITIES
 */

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    nullable: true,
    default: null,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp with time zone",
    nullable: true,
    default: null,
  })
  deletedAt: Date | null;
}
