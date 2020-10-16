import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
