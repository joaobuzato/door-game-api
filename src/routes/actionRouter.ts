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
        return response.status(404).json({ message: "Action não encontrado" });
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
    const action = new Action(request.body);
    controller
      .update(action)
      .then((result) => {
        if (result.success)
          return response
            .status(201)
            .json({ success: true, message: "Criado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar action" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar action" });
      });
  }
);

actionsRouter.put(
  "/actions/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    const { id } = request.params;
    const action = new Action(request.body, Number(id));
    controller
      .update(action)
      .then((result) => {
        if (result.success)
          return response
            .status(200)
            .json({ success: true, message: "Atualizado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar action" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar action" });
      });
  }
);
actionsRouter.delete(
  "/actions/:id",
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
          .json({ success: false, message: "Erro ao deletar action" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao deletar action" });
      });
  }
);

export { actionsRouter };
