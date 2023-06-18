import { Router } from "express";
import { Condition } from "../Condition/Condition";

import ConditionController from "../Condition/ConditionController";
import { authenticateToken, emptyAuthMiddleware } from "./authRouter";
const conditionsRouter = Router();
const controller = new ConditionController();

conditionsRouter.get(
  "/conditions",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const body = await controller.getAll();
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        response.status(400).json({ message: "Erro ao obter conditions" });
      }
    }
  }
);

conditionsRouter.get(
  "/conditions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const body = await controller.getById(Number(id));
      if (!body) {
        return response
          .status(404)
          .json({ message: "condition não encontrado" });
      }
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        return response
          .status(400)
          .json({ message: "Erro ao obter condition" });
      }
    }
  }
);

conditionsRouter.post(
  "/conditions",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const condition = new Condition(request.body);
      await controller.insert(condition);
      response.status(201).json({ message: "Inserido!" });
    } catch (e) {
      if (e instanceof Error) {
        response.status(400).json({ message: "Erro ao salvar condition" });
      }
    }
  }
);

conditionsRouter.put(
  "/conditions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const condition = new Condition(request.body, Number(id));
      await controller.update(condition);
      return response.status(204).send({ message: "Atualizado!!" });
    } catch (e) {
      if (e instanceof Error) {
        return response
          .status(400)
          .json({ message: "Erro ao atualizar condition" });
      }
    }
  }
);
conditionsRouter.delete(
  "/conditions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      await controller.delete(Number(id));
      response.json({ message: "Deletado!!" });
      return response.status(204);
    } catch (e) {
      if (e instanceof Error) {
        return response
          .status(400)
          .json({ message: "Erro ao deletar condition" });
      }
    }
  }
);

export { conditionsRouter };
