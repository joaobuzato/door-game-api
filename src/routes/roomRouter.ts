import { Router } from "express";
import { Room } from "../Room/Room";
import { log } from "../Logger";
import RoomController from "../Room/RoomController";
import { authenticateToken, emptyAuthMiddleware } from "./authRouter";
const roomsRouter = Router();
const controller = new RoomController();

roomsRouter.get("/rooms", async (request, response) => {
  try {
    const body = await controller.getAll();
    return response.status(200).json(body);
  } catch (e) {
    if (e instanceof Error) {
      log(e.message);
      return response.status(400).json({ message: "Erro ao obter rooms" });
    }
  }
});

roomsRouter.get(
  "/rooms/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const body = await controller.getById(Number(id));
      if (!body) {
        return response.status(404).json({ message: "room não encontrado" });
      }
      response.json(body);
      return response.status(200);
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response.status(400).json({ message: "Erro ao obter room" });
      }
    }
  }
);

roomsRouter.post(
  "/rooms",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const room = new Room(request.body);
      await controller.insert(room);
      return response.status(201).json({ message: "Inserido!" });
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response.status(400).json({ message: "Erro ao salvar room" });
      }
    }
  }
);

roomsRouter.put(
  "/rooms/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    try {
      const { id } = request.params;
      const room = new Room(request.body, Number(id));
      await controller.update(room);
      return response.status(204).send({ message: "Atualizado!!" });
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response.status(400).json({ message: "Erro ao atualizar room" });
      }
    }
  }
);
roomsRouter.delete(
  "/rooms/:id",
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
        return response.status(400).json({ message: "Erro ao deletar room" });
      }
    }
  }
);

export { roomsRouter };
