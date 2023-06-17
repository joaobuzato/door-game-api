import { Router } from "express";
import { Door } from "../Door/Door";
import { log } from "../Logger";
import DoorController from "../Door/DoorController";
import { authenticateToken, emptyAuthMiddleware } from "./authRouter";
const doorsRouter = Router();
const controller = new DoorController();

doorsRouter.get(
  "/doors",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const body = await controller.getAll();
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        response.status(400).json({ message: "Erro ao obter doors" });
      }
    }
  }
);

doorsRouter.get(
  "/doors/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const body = await controller.getById(Number(id));
      if (!body) {
        return response.status(404).json({ message: "door não encontrado" });
      }
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response.status(400).json({ message: "Erro ao obter door" });
      }
    }
  }
);

doorsRouter.post(
  "/doors",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const door = new Door(request.body);
      await controller.insert(door);
      return response.status(201).json({ message: "Inserido!" });
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response.status(400).json({ message: "Erro ao salvar door" });
      }
    }
  }
);

doorsRouter.put(
  "/doors/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const door = new Door(request.body, Number(id));
      await controller.update(door);
      return response.status(204).send({ message: "Atualizado!!" });
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response.status(400).json({ message: "Erro ao atualizar door" });
      }
    }
  }
);
doorsRouter.delete(
  "/doors/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      await controller.delete(Number(id));
      response.json({ message: "Deletado!!" });
      return response.status(204);
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response.status(400).json({ message: "Erro ao deletar door" });
      }
    }
  }
);

export { doorsRouter };
