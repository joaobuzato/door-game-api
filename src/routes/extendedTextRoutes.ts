import { Router } from "express";
import { ExtendedText } from "../ExtendedText/ExtendedText";
import ExtendedTextController from "../ExtendedText/ExtendedTextController";
const extendedTextsRouter = Router();
const controller = new ExtendedTextController();

extendedTextsRouter.get("/extendedTexts", async (request, response) => {
  try {
    const body = await controller.getAll();
    response.json(body);
    return response.status(200).send();
  } catch (e) {
    console.log(e);
    response
      .status(400)
      .json({ message: "Erro ao obter extendedTexts" })
      .send();
  }
});

extendedTextsRouter.get("/extendedTexts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (id) {
      const body = await controller.getById(Number(id));
      if (!body) {
        response
          .status(404)
          .json({ message: "extendedText não encontrado" })
          .send();
      }
      response.json(body);
      return response.status(200).send();
    }

    return response
      .status(400)
      .json({ message: "O id informado não é válido." })
      .send();
  } catch (e) {
    console.log(e);
    response.status(400).json({ message: "Erro ao obter extendedText" }).send();
  }
});

extendedTextsRouter.post("/extendedTexts", async (request, response) => {
  try {
    const extendedText = new ExtendedText(request.body);
    await controller.insert(extendedText);
    response.json({ message: "Inserido!" });
    return response.status(201).send();
  } catch (e) {
    console.log(e);
    response
      .status(400)
      .json({ message: "Erro ao salvar extendedText" })
      .send();
  }
});

extendedTextsRouter.put("/extendedTexts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const extendedText = new ExtendedText(request.body, Number(id));
    await controller.update(extendedText);
    response.json({ message: "Atualizado!!" });
    return response.status(204).send();
  } catch (e) {
    console.log(e);
    response
      .status(400)
      .json({ message: "Erro ao atualizar extendedText" })
      .send();
  }
});
extendedTextsRouter.delete("/extendedTexts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await controller.delete(Number(id));
    response.json({ message: "Deletado!!" });
    return response.status(204).send();
  } catch (e) {
    console.log(e);
    response
      .status(400)
      .json({ message: "Erro ao atualizar extendedText" })
      .send();
  }
});

export { extendedTextsRouter };
