import { Router } from "express";
import cors from "cors";
import { extendedTextsRouter } from "./extendedTextRouter";
import { actionsRouter } from "./actionRouter";
import { conditionsRouter } from "./conditionRouter";
import { roomsRouter } from "./roomRouter";
import { doorsRouter } from "./doorRouter";
import { authRouter } from "./authRouter";

export default class routes {
  app: any;
  router: any;
  constructor(app: any) {
    this.app = app;
    this.router = Router();

    const corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };

    this.router.get("/", (request: any, response: any) => {
      response.json({ message: "deu tudo certo!" });
      return response.status(200);
    });

    this.app.use(this.router);
    this.app.use(cors(corsOptions));
    this.app.use(authRouter);
    this.app.use(extendedTextsRouter);
    this.app.use(actionsRouter);
    this.app.use(conditionsRouter);
    this.app.use(roomsRouter);
    this.app.use(doorsRouter);
  }
}
