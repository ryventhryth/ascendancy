import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "../models/User";

@InputType()
export class UserRegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@ObjectType()
class Error {
  @Field()
  fieldname: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserRegisterResponse {
  @Field()
  status: boolean;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}

@ObjectType()
export class UserLoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;
}
