import { Router } from "express";
import { Room } from "../Room/Room";
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
        return response.status(404).json({ message: "Room não encontrado" });
      }
      return response.status(200).json(body);
    } catch (e) {
      if (e instanceof Error) {
        return response.status(400).json({ message: "Erro ao obter room" });
      }
    }
  }
);

roomsRouter.post(
  "/rooms",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    const room = new Room(request.body);
    controller
      .update(room)
      .then((result) => {
        if (result.success)
          return response
            .status(201)
            .json({ success: true, message: "Criado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar room" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao criar room" });
      });
  }
);

roomsRouter.put(
  "/rooms/:id",
  process.env.NODE_ENV === "test" ? emptyAuthMiddleware : authenticateToken,
  async (request, response) => {
    const { id } = request.params;
    const room = new Room(request.body, Number(id));
    controller
      .update(room)
      .then((result) => {
        if (result.success)
          return response
            .status(200)
            .json({ success: true, message: "Atualizado" });
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar room" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao atualizar room" });
      });
  }
);
roomsRouter.delete(
  "/rooms/:id",
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
          .json({ success: false, message: "Erro ao deletar room" });
      })
      .catch((e) => {
        console.log(e);
        return response
          .status(400)
          .json({ success: false, message: "Erro ao deletar room" });
      });
  }
);

export { roomsRouter };
