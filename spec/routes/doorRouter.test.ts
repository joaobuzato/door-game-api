import request from "supertest";
import { app } from "../../src/app";
import { Door } from "../../src/Door/Door";
import DoorController from "../../src/Door/DoorController";
jest.mock("../../src/Door/DoorController");

describe("GET /doors", () => {
  let getAllSpy: jest.SpyInstance;
  const doors: Door[] = [
    {
      id: 1,
      path: "path",
      color: "#000000",
      room_id: 2,
    },
    {
      id: 2,
      path: "path",
      color: "#033000",
      room_id: 5,
    },
    {
      id: 1,
      path: "patfh",
      color: "#000fd0",
      room_id: 2,
    },
  ];
  beforeEach(() => {
    getAllSpy = jest.spyOn(DoorController.prototype, "getAll");
  });
  afterEach(() => {
    getAllSpy.mockClear();
  });
  test("should respond with JSON data and status 200 on get All", async () => {
    getAllSpy.mockResolvedValue(doors);

    const response = await request(app).get("/doors");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(doors);
  });

  test("should handle errors and respond with JSON data and status 400 on get All", async () => {
    getAllSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get("/doors");

    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter doors" });
    expect(response.status).toBe(400);
  });
});

describe("GET /doors/:id", () => {
  let getByIdSpy: jest.SpyInstance;
  const id = 1;
  const door: Door = {
    id: 1,
    path: "path",
    color: "#000000",
    room_id: 2,
  };
  beforeEach(() => {
    getByIdSpy = jest.spyOn(DoorController.prototype, "getById");
  });
  afterEach(() => {
    getByIdSpy.mockClear();
  });
  test("should respond with JSON data and status 200 when get by id", async () => {
    getByIdSpy.mockResolvedValue(door);

    const response = await request(app).get(`/doors/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(door);
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should respond with status 404 when id not found on get by id", async () => {
    getByIdSpy.mockResolvedValue(null);

    const response = await request(app).get(`/doors/${id}`);

    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "door não encontrado" });
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    getByIdSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get(`/doors/${id}`);

    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter door" });
    expect(response.status).toBe(400);
  });
});

describe("POST /doors", () => {
  let insertSpy: jest.SpyInstance;
  const door = new Door({
    path: "path",
    color: "#000000",
    room_id: 2,
  });
  beforeEach(() => {
    insertSpy = jest.spyOn(DoorController.prototype, "insert");
  });
  afterEach(() => {
    insertSpy.mockClear();
  });
  test("should respond with success when inserted successfully", async () => {
    insertSpy.mockResolvedValue(null);

    const response = await request(app)
      .post(`/doors`)
      .set("Content-type", "application/json")
      .send(door);

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(insertSpy).toBeCalledTimes(1);
    expect(insertSpy).toBeCalledWith(door);
  });

  test("should handle errors and respond with JSON data and status 400 on insert", async () => {
    insertSpy.mockRejectedValue(new Error("error"));

    const response = await request(app)
      .post(`/doors`)
      .set("Content-type", "application/json")
      .send(door);

    expect(insertSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao salvar door" });
    expect(response.status).toBe(400);
  });
});

describe("PUT /doors/:id", () => {
  let updateSpy: jest.SpyInstance;
  const id = 1;
  const door = new Door(
    {
      path: "path",
      color: "#000000",
      room_id: 2,
    },
    id
  );
  beforeEach(() => {
    updateSpy = jest.spyOn(DoorController.prototype, "update");
  });
  afterEach(() => {
    updateSpy.mockClear();
  });
  test("should respond with success when updated successfully", async () => {
    updateSpy.mockResolvedValue(null);

    const response = await request(app)
      .put(`/doors/${id}`)
      .set("Content-type", "application/json")
      .send(door);

    expect(response.status).toBe(204);
    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toBeCalledWith(door);
  });

  test("should handle errors and respond with JSON data and status 400 on update", async () => {
    updateSpy.mockRejectedValue(new Error("error"));

    const response = await request(app)
      .put(`/doors/${id}`)
      .set("Content-type", "application/json")
      .send(door);

    expect(updateSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      message: "Erro ao atualizar door",
    });
    expect(response.status).toBe(400);
  });
});

describe("DELETE /doors/:id", () => {
  let deleteSpy: jest.SpyInstance;
  const id = 1;
  beforeEach(() => {
    deleteSpy = jest.spyOn(DoorController.prototype, "delete");
  });
  afterEach(() => {
    deleteSpy.mockClear();
  });
  test("should respond with JSON data and status 200 when get by id", async () => {
    deleteSpy.mockResolvedValue(null);

    const response = await request(app).delete(`/doors/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    deleteSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).delete(`/doors/${id}`);

    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao deletar door" });
    expect(response.status).toBe(400);
  });
});
