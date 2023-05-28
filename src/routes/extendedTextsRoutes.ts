import { Router } from "express";
import { ExtendedText } from "../ExtendedText/ExtendedText";
import ExtendedTextsController from "../ExtendedText/ExtendedTextController";
const extendedTextsRouter = Router();
const controller = new ExtendedTextsController();

extendedTextsRouter.get("/extendedTexts", async (request, response) => {
  const body = await controller.getAll();
  response.json(body);
  return response.status(200).send();
});

extendedTextsRouter.get("/extendedTexts/:id", async (request, response) => {
  const { id } = request.params;
  if (id) {
    const body = await controller.getById(Number(id));
    response.json(body);
    return response.status(200).send();
  }

  response.json({ message: "O id informado não é válido." });
  return response.status(400).send();
});

extendedTextsRouter.post("/extendedTexts", async (request, response) => {
  const extendedText = new ExtendedText(request.body);
  await controller.insert(extendedText);
  response.json({ message: "Inserido!" });
  return response.status(201).send();
});

export { extendedTextsRouter };
