import { User } from "./../models/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import argon2 from "argon2";

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

  @Mutation(() => Boolean)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("email") email: string
  ) {
    const hashedPassword = await argon2.hash(password);

    const user = User.create({
      username,
      password: hashedPassword,
      email
    });

    console.log(user);

    try {
      await user.save();
      return true;
    } catch {
      return false;
    }
  }
}
