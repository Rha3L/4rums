import { Post } from "src/entities/Post";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  hello() {
    return "bye";
  }
}
