import { Router } from "express";
import { ExtendedText } from "../ExtendedText/ExtendedText";
import ExtendedTextController from "../ExtendedText/ExtendedTextController";
const extendedTextsRouter = Router();
const controller = new ExtendedTextController();
import { authenticateToken, emptyAuthMiddleware } from "./authRouter";

extendedTextsRouter.get(
  "/extendedTexts",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const body = await controller.getAll();
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        response.status(400).json({ message: "Erro ao obter extendedTexts" });
      }
    }
  }
);

extendedTextsRouter.get(
  "/extendedTexts/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const body = await controller.getById(Number(id));
      if (!body) {
        return response
          .status(404)
          .json({ message: "ExtendedText não encontrado" });
      }
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        return response
          .status(400)
          .json({ message: "Erro ao obter extendedText" });
      }
    }
  }
);

extendedTextsRouter.post(
  "/extendedTexts",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    const extendedText = new ExtendedText(request.body);
    controller
      .insert(extendedText)
      .then((result) => {
        if (result.success)
          return response
            .status(201)
            .json({ success: true, message: "Criado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar extendedText" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar extendedText" });
      });
  }
);

extendedTextsRouter.put(
  "/extendedTexts/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    const { id } = request.params;
    const extendedText = new ExtendedText(request.body, Number(id));
    controller
      .update(extendedText)
      .then((result) => {
        if (result.success)
          return response
            .status(200)
            .json({ success: true, message: "Atualizado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar extendedText" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar extendedText" });
      });
  }
);
extendedTextsRouter.delete(
  "/extendedTexts/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    const { id } = request.params;
    controller
      .delete(Number(id))
      .then((result) => {
        if (result.success)
          return response
            .status(200)
            .json({ success: true, message: "Deletado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao deletar extendedText" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao deletar extendedText" });
      });
  }
);
export { extendedTextsRouter };
