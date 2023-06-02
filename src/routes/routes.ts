import { Router } from "express";
import { extendedTextsRouter } from "./extendedTextRoutes";

export default class routes {
  app: any;
  router: any;
  constructor(app: any) {
    this.app = app;
    this.router = Router();
    this.router.get("/", (request: any, response: any) => {
      response.json({ message: "deu tudo certo!" });
      return response.status(200).send();
    });

    this.app.use(this.router);
    this.app.use(extendedTextsRouter);
  }
}
