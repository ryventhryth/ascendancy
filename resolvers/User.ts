import { User } from "./../models/User";
import { Resolver, Query, Mutation } from "type-graphql";

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

  @Mutation(() => Boolean)
  async register() {
    return true;
  }
}
