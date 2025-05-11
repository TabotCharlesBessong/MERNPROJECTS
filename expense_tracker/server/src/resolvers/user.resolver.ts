import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello GraphQL";
  }

  @Mutation(() => User)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({ email, password: hashedPassword });
    await user.save();
    return user;
  }
}
