import { User } from "./../models/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import argon2 from "argon2";
import { validateUserCredentials } from "../utils";
import {
  UserRegisterResponse,
  UserRegisterInput,
  UserLoginResponse
} from "./types";

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

  @Mutation(() => UserLoginResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<UserLoginResponse> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return {
        status: false
      };
    }

    const isPassValid = await argon2.verify(user.password, password);

    if (!isPassValid) {
      return {
        status: false
      };
    }

    return {
      user
    };
  }

  @Mutation(() => UserRegisterResponse)
  async register(
    @Arg("credentials") credentials: UserRegisterInput
  ): Promise<UserRegisterResponse> {
    const user = await User.findOne({
      where: { username: credentials.username }
    });

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
