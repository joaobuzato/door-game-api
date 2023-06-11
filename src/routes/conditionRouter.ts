import { Router } from "express";
import { Condition } from "../Condition/Condition";
import { log } from "../Logger";
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
      return response.status(200).send();
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        response
          .status(400)
          .json({ message: "Erro ao obter conditions" })
          .send();
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
          .json({ message: "condition não encontrado" })
          .send();
      }
      response.json(body);
      return response.status(200).send();
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response
          .status(400)
          .json({ message: "Erro ao obter condition" })
          .send();
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
        log(e.message);
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
        log(e.message);
        return response
          .status(400)
          .json({ message: "Erro ao atualizar condition" })
          .send();
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
      return response.status(204).send();
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response
          .status(400)
          .json({ message: "Erro ao deletar condition" })
          .send();
      }
    }
  }
);

export { conditionsRouter };
