import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import { redisOptions } from "./redisConfig";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction, Response } from "express";

class App {
  public app: GraphQLServer;
  public pubSub: RedisPubSub;
  constructor() {
    this.pubSub = new RedisPubSub({
      publisher: new Redis(redisOptions),
      subscriber: new Redis(redisOptions)
    });
    this.app = new GraphQLServer({
      schema,
      context: req => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          context
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
