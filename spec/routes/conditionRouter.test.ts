import request from "supertest";
import { app } from "../../src/app";
import { Condition } from "../../src/Condition/Condition";
import ConditionController from "../../src/Condition/ConditionController";
jest.mock("../../src/Condition/ConditionController");

describe("GET /conditions", () => {
  let getAllSpy: jest.SpyInstance;
  const conditions: Condition[] = [
    {
      id: 1,
      element1: "element",
      type: "greater",
      element2: "element2",
      action_id: 1,
    },
    {
      id: 2,
      element1: "element",
      type: "lesser",
      element2: "element2",
      action_id: 1,
    },
  ];
  beforeEach(() => {
    getAllSpy = jest.spyOn(ConditionController.prototype, "getAll");
  });
  afterEach(() => {
    getAllSpy.mockClear();
  });
  test("should respond with JSON data and status 200 on get All", async () => {
    getAllSpy.mockResolvedValue(conditions);

    const response = await request(app).get("/conditions");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(conditions);
  });

  test("should handle errors and respond with JSON data and status 400 on get All", async () => {
    getAllSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get("/conditions");

    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter conditions" });
    expect(response.status).toBe(400);
  });
});

describe("GET /conditions/:id", () => {
  let getByIdSpy: jest.SpyInstance;
  const id = 1;
  const condition: Condition = {
    id: 1,
    element1: "element",
    type: "greater",
    element2: "element2",
    action_id: 1,
  };
  beforeEach(() => {
    getByIdSpy = jest.spyOn(ConditionController.prototype, "getById");
  });
  afterEach(() => {
    getByIdSpy.mockClear();
  });
  test("should respond with JSON data and status 200 when get by id", async () => {
    getByIdSpy.mockResolvedValue(condition);

    const response = await request(app).get(`/conditions/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(condition);
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should respond with status 404 when id not found on get by id", async () => {
    getByIdSpy.mockResolvedValue(null);

    const response = await request(app).get(`/conditions/${id}`);

    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "condition não encontrado" });
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    getByIdSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get(`/conditions/${id}`);

    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter condition" });
    expect(response.status).toBe(400);
  });
});

describe("POST /conditions", () => {
  let insertSpy: jest.SpyInstance;
  const condition = new Condition({
    element1: "element",
    type: "greater",
    element2: "element2",
    action_id: 1,
  });
  beforeEach(() => {
    insertSpy = jest.spyOn(ConditionController.prototype, "insert");
  });
  afterEach(() => {
    insertSpy.mockClear();
  });
  test("should respond with success when inserted successfully", async () => {
    insertSpy.mockResolvedValue(null);

    const response = await request(app)
      .post(`/conditions`)
      .set("Content-type", "application/json")
      .send(condition);

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(insertSpy).toBeCalledTimes(1);
    expect(insertSpy).toBeCalledWith(condition);
  });

  test("should handle errors and respond with JSON data and status 400 on insert", async () => {
    insertSpy.mockRejectedValue(new Error("error"));

    const response = await request(app)
      .post(`/conditions`)
      .set("Content-type", "application/json")
      .send(condition);

    expect(insertSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao salvar condition" });
    expect(response.status).toBe(400);
  });
});

describe("PUT /conditions/:id", () => {
  let updateSpy: jest.SpyInstance;
  const id = 1;
  const condition = new Condition(
    {
      element1: "element",
      type: "greater",
      element2: "element2",
      action_id: 1,
    },
    id
  );
  beforeEach(() => {
    updateSpy = jest.spyOn(ConditionController.prototype, "update");
  });
  afterEach(() => {
    updateSpy.mockClear();
  });
  test("should respond with success when updated successfully", async () => {
    updateSpy.mockResolvedValue(null);

    const response = await request(app)
      .put(`/conditions/${id}`)
      .set("Content-type", "application/json")
      .send(condition);

    expect(response.status).toBe(204);
    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toBeCalledWith(condition);
  });

  test("should handle errors and respond with JSON data and status 400 on update", async () => {
    updateSpy.mockRejectedValue(new Error("error"));

    const response = await request(app)
      .put(`/conditions/${id}`)
      .set("Content-type", "application/json")
      .send(condition);

    expect(updateSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      message: "Erro ao atualizar condition",
    });
    expect(response.status).toBe(400);
  });
});

describe("DELETE /conditions/:id", () => {
  let deleteSpy: jest.SpyInstance;
  const id = 1;
  beforeEach(() => {
    deleteSpy = jest.spyOn(ConditionController.prototype, "delete");
  });
  afterEach(() => {
    deleteSpy.mockClear();
  });
  test("should respond with JSON data and status 200 when get by id", async () => {
    deleteSpy.mockResolvedValue(null);

    const response = await request(app).delete(`/conditions/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    deleteSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).delete(`/conditions/${id}`);

    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao deletar condition" });
    expect(response.status).toBe(400);
  });
});
