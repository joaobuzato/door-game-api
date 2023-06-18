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
          .json({ message: "Condition não encontrado" });
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
    const condition = new Condition(request.body);
    controller
      .update(condition)
      .then((result) => {
        if (result.success)
          return response
            .status(201)
            .json({ success: true, message: "Criado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar condition" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar condition" });
      });
  }
);

conditionsRouter.put(
  "/conditions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    const { id } = request.params;
    const condition = new Condition(request.body, Number(id));
    controller
      .update(condition)
      .then((result) => {
        if (result.success)
          return response
            .status(200)
            .json({ success: true, message: "Atualizado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar condition" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar condition" });
      });
  }
);
conditionsRouter.delete(
  "/conditions/:id",
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
          .json({ success: false, message: "Erro ao deletar condition" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao deletar condition" });
      });
  }
);

export { conditionsRouter };
