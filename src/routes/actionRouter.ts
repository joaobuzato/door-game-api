import { Router } from "express";
import { Action } from "../Action/Action";
import ActionController from "../Action/ActionController";
import { authenticateToken, emptyAuthMiddleware } from "./authRouter";
const actionsRouter = Router();
const controller = new ActionController();

actionsRouter.get(
  "/actions",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const body = await controller.getAll();
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        response.status(400).json({ message: "Erro ao obter actions" });
      }
    }
  }
);

actionsRouter.get(
  "/actions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const body = await controller.getById(Number(id));
      if (!body) {
        return response.status(404).json({ message: "action não encontrado" });
      }
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        return response.status(400).json({ message: "Erro ao obter action" });
      }
    }
  }
);

actionsRouter.post(
  "/actions",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const action = new Action(request.body);
      await controller.insert(action);
      response.status(201).json({ message: "Inserido!" });
    } catch (e) {
      if (e instanceof Error) {
        response.status(400).json({ message: "Erro ao salvar action" });
      }
    }
  }
);

actionsRouter.put(
  "/actions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const action = new Action(request.body, Number(id));
      await controller.update(action);
      return response.status(204).send({ message: "Atualizado!!" });
    } catch (e) {
      if (e instanceof Error) {
        return response
          .status(400)
          .json({ message: "Erro ao atualizar action" });
      }
    }
  }
);
actionsRouter.delete(
  "/actions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      await controller.delete(Number(id));
      response.json({ message: "Deletado!!" });
      return response.status(204);
    } catch (e) {
      if (e instanceof Error) {
        return response.status(400).json({ message: "Erro ao deletar action" });
      }
    }
  }
);

export { actionsRouter };
