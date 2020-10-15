import { User } from "./../models/User";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  ObjectType
} from "type-graphql";
import argon2 from "argon2";
import { validateUserCredentials } from "../utils";

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
class UserRegisterResponse {
  @Field()
  status: boolean;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async getUserInfos() {
    return {
      id: "2",
      username: "zxc",
      email: "zxc@zxc.com"
    };
  }

  @Query(() => [User])
  async getAllUsers() {
    return User.find();
  }

  @Mutation(() => UserRegisterResponse)
  async register(
    @Arg("credentials") credentials: UserRegisterInput
  ): Promise<UserRegisterResponse> {
    const user = User.find({ where: { username: credentials.username } });

    if (user) {
      return {
        status: false,
        errors: [{ fieldname: "uniq", message: "uniq" }]
      };
    }

    const errors = await validateUserCredentials(credentials);

    if (errors.length !== 0) {
      return {
        status: false,
        errors
      };
    }

    const hashedPassword = await argon2.hash(credentials.password);

    const newUser = User.create({
      ...credentials,
      password: hashedPassword
    });

    try {
      await newUser.save();
      return {
        status: true
      };
    } catch {
      return {
        status: false,
        errors: [
          {
            fieldname: "something went wrong",
            message: "something went wrong"
          }
        ]
      };
    }
  }
}
