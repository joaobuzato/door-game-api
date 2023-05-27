import { Router } from "express";
import ExtendedTextsController from "../ExtendedText/ExtendedTextController";
const extendedTextsRouter = Router();
const controller = new ExtendedTextsController();

extendedTextsRouter.get("/extendedTexts", async (request, response) => {
  const body = await controller.getAll();
  response.json(body);
  return response.status(200).send();
});

export { extendedTextsRouter };
