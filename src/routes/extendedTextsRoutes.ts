import { Router } from "express";
import extendedTextsController from "../extendedTexts/extendedTextsController";
const extendedTextsRouter = Router();
const controller = new extendedTextsController();

extendedTextsRouter.get("/extendedTexts", (request, response) => {
  const body = controller.getAll([]);
  response.json(body);
  return response.status(200).send();
});

export { extendedTextsRouter };
