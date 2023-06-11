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
    response.json(body);
    return response.status(200).send();
  } catch (e) {
    if (e instanceof Error) {
      log(e.message);
      response.status(400).json({ message: "Erro ao obter rooms" }).send();
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
        return response
          .status(404)
          .json({ message: "room não encontrado" })
          .send();
      }
      response.json(body);
      return response.status(200).send();
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response
          .status(400)
          .json({ message: "Erro ao obter room" })
          .send();
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
      return response.status(201).json({ message: "Inserido!" }).send();
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response
          .status(400)
          .json({ message: "Erro ao salvar room" })
          .send();
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
        return response
          .status(400)
          .json({ message: "Erro ao atualizar room" })
          .send();
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
      return response.status(204).send();
    } catch (e) {
      if (e instanceof Error) {
        log(e.message);
        return response
          .status(400)
          .json({ message: "Erro ao deletar room" })
          .send();
      }
    }
  }
);

export { roomsRouter };
