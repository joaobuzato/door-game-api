import { Router } from "express";
import { ExtendedText } from "../ExtendedText/ExtendedText";
import ExtendedTextsController from "../ExtendedText/ExtendedTextController";
const extendedTextsRouter = Router();
const controller = new ExtendedTextsController();

extendedTextsRouter.get("/extendedTexts", async (request, response) => {
  try {
    const body = await controller.getAll();
    response.json(body);
    return response.status(200).send();
  } catch (e) {
    console.log(e);
    response
      .json({ message: "Erro ao obter extendedTexts" })
      .status(400)
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
          .json({ message: "extendedText não encontrado" })
          .status(404)
          .send();
      }
      response.json(body);
      return response.status(200).send();
    }

    response.json({ message: "O id informado não é válido." });
    return response.status(400).send();
  } catch (e) {
    console.log(e);
    response.json({ message: "Erro ao obter extendedText" }).status(400).send();
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
      .json({ message: "Erro ao salvar extendedText" })
      .status(400)
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
      .json({ message: "Erro ao atualizar extendedText" })
      .status(400)
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
      .json({ message: "Erro ao atualizar extendedText" })
      .status(400)
      .send();
  }
});

export { extendedTextsRouter };
