import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { Options } from "@mikro-orm/core";
import path from "path";

const MikroConfig: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  entities: [Post],
  dbName: "db0",
  user: "",
  password: "", //TODO: setup user
  type: "postgresql",
  debug: !__prod__,
};

export default MikroConfig;
