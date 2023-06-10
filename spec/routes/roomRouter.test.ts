import request from "supertest";
import { app } from "../../src/app";
import { Room } from "../../src/Room/Room";
import RoomController from "../../src/Room/RoomController";
jest.mock("../../src/Room/RoomController");

describe("GET /rooms", () => {
  let getAllSpy: jest.SpyInstance;
  const rooms: Room[] = [
    {
      id: 1,
      title: "title",
      text: "text",
      path: "path",
      actions: [],
      doors: [],
      rooms: [],
    },
    {
      id: 2,
      title: "title 45",
      text: "texasdasdast",
      path: "paasdasdth",
      actions: [],
      doors: [],
      rooms: [],
    },
  ];
  beforeEach(() => {
    getAllSpy = jest.spyOn(RoomController.prototype, "getAll");
  });
  afterEach(() => {
    getAllSpy.mockClear();
  });
  test("should respond with JSON data and status 200 on get All", async () => {
    getAllSpy.mockResolvedValue(rooms);

    const response = await request(app).get("/rooms");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(rooms);
  });

  test("should handle errors and respond with JSON data and status 400 on get All", async () => {
    getAllSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get("/rooms");

    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter rooms" });
    expect(response.status).toBe(400);
  });
});

describe("GET /rooms/:id", () => {
  let getByIdSpy: jest.SpyInstance;
  const id = 1;
  const room: Room = {
    id: 1,
    title: "title",
    text: "text",
    path: "path",
    actions: [],
    doors: [],
    rooms: [],
  };
  beforeEach(() => {
    getByIdSpy = jest.spyOn(RoomController.prototype, "getById");
  });
  afterEach(() => {
    getByIdSpy.mockClear();
  });
  test("should respond with JSON data and status 200 when get by id", async () => {
    getByIdSpy.mockResolvedValue(room);

    const response = await request(app).get(`/rooms/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(room);
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should respond with status 404 when id not found on get by id", async () => {
    getByIdSpy.mockResolvedValue(null);

    const response = await request(app).get(`/rooms/${id}`);

    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "room não encontrado" });
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    getByIdSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get(`/rooms/${id}`);

    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter room" });
    expect(response.status).toBe(400);
  });
});

describe("POST /rooms", () => {
  let insertSpy: jest.SpyInstance;
  const room = new Room({
    title: "title 45",
    text: "texasdasdast",
    path: "paasdasdth",
    actions: [],
    doors: [],
    rooms: [],
  });
  beforeEach(() => {
    insertSpy = jest.spyOn(RoomController.prototype, "insert");
  });
  afterEach(() => {
    insertSpy.mockClear();
  });
  test("should respond with success when inserted successfully", async () => {
    insertSpy.mockResolvedValue(null);

    const response = await request(app)
      .post(`/rooms`)
      .set("Content-type", "application/json")
      .send(room);

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(insertSpy).toBeCalledTimes(1);
    expect(insertSpy).toBeCalledWith(room);
  });

  test("should handle errors and respond with JSON data and status 400 on insert", async () => {
    insertSpy.mockRejectedValue(new Error("error"));

    const response = await request(app)
      .post(`/rooms`)
      .set("Content-type", "application/json")
      .send(room);

    expect(insertSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao salvar room" });
    expect(response.status).toBe(400);
  });
});

describe("PUT /rooms/:id", () => {
  let updateSpy: jest.SpyInstance;
  const id = 1;
  const room = new Room(
    {
      title: "title 45",
      text: "texasdasdast",
      path: "paasdasdth",
      actions: [],
      doors: [],
      rooms: [],
    },
    id
  );
  beforeEach(() => {
    updateSpy = jest.spyOn(RoomController.prototype, "update");
  });
  afterEach(() => {
    updateSpy.mockClear();
  });
  test("should respond with success when updated successfully", async () => {
    updateSpy.mockResolvedValue(null);

    const response = await request(app)
      .put(`/rooms/${id}`)
      .set("Content-type", "application/json")
      .send(room);

    expect(response.status).toBe(204);
    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toBeCalledWith(room);
  });

  test("should handle errors and respond with JSON data and status 400 on update", async () => {
    updateSpy.mockRejectedValue(new Error("error"));

    const response = await request(app)
      .put(`/rooms/${id}`)
      .set("Content-type", "application/json")
      .send(room);

    expect(updateSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      message: "Erro ao atualizar room",
    });
    expect(response.status).toBe(400);
  });
});

describe("DELETE /rooms/:id", () => {
  let deleteSpy: jest.SpyInstance;
  const id = 1;
  beforeEach(() => {
    deleteSpy = jest.spyOn(RoomController.prototype, "delete");
  });
  afterEach(() => {
    deleteSpy.mockClear();
  });
  test("should respond with JSON data and status 200 when get by id", async () => {
    deleteSpy.mockResolvedValue(null);

    const response = await request(app).delete(`/rooms/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    deleteSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).delete(`/rooms/${id}`);

    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao deletar room" });
    expect(response.status).toBe(400);
  });
});