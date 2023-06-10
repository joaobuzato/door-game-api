import { Router } from "express";
import { Door } from "../Door/Door";
import { log } from "../Logger";
import DoorController from "../Door/DoorController";
const doorsRouter = Router();
const controller = new DoorController();

doorsRouter.get("/doors", async (request, response) => {
  try {
    const body = await controller.getAll();
    response.json(body);
    return response.status(200).send();
  } catch (e) {
    if (e instanceof Error) {
      log(e.message);
      response.status(400).json({ message: "Erro ao obter doors" }).send();
    }
  }
});

doorsRouter.get("/doors/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const body = await controller.getById(Number(id));
    if (!body) {
      return response
        .status(404)
        .json({ message: "door não encontrado" })
        .send();
    }
    response.json(body);
    return response.status(200).send();
  } catch (e) {
    if (e instanceof Error) {
      log(e.message);
      return response
        .status(400)
        .json({ message: "Erro ao obter door" })
        .send();
    }
  }
});

doorsRouter.post("/doors", async (request, response) => {
  try {
    const door = new Door(request.body);
    await controller.insert(door);
    return response.status(201).json({ message: "Inserido!" }).send();
  } catch (e) {
    if (e instanceof Error) {
      log(e.message);
      return response
        .status(400)
        .json({ message: "Erro ao salvar door" })
        .send();
    }
  }
});

doorsRouter.put("/doors/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const door = new Door(request.body, Number(id));
    await controller.update(door);
    return response.status(204).send({ message: "Atualizado!!" });
  } catch (e) {
    if (e instanceof Error) {
      log(e.message);
      return response
        .status(400)
        .json({ message: "Erro ao atualizar door" })
        .send();
    }
  }
});
doorsRouter.delete("/doors/:id", async (request, response) => {
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
        .json({ message: "Erro ao deletar door" })
        .send();
    }
  }
});

export { doorsRouter };
