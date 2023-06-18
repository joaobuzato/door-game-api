import request from "supertest";
import { app } from "../../src/app";
import { Action } from "../../src/Action/Action";
import ActionController from "../../src/Action/ActionController";

describe("GET /actions", () => {
  let getAllSpy: jest.SpyInstance;
  const actions: Action[] = [
    {
      id: 2,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 7,
    },
    {
      id: 3,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 4,
    },
  ];
  beforeEach(() => {
    getAllSpy = jest.spyOn(ActionController.prototype, "getAll");
  });
  afterEach(() => {
    getAllSpy.mockClear();
  });
  test("should respond with JSON data and status 200 on get All", async () => {
    getAllSpy.mockResolvedValue(actions);

    const response = await request(app).get("/actions");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(actions);
  });

  test("should handle errors and respond with JSON data and status 400 on get All", async () => {
    getAllSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get("/actions");

    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter actions" });
    expect(response.status).toBe(400);
  });
});

describe("GET /actions/:id", () => {
  let getByIdSpy: jest.SpyInstance;
  const id = 1;
  const action: Action = {
    id: 2,
    type: "get",
    button_text: "valid button text",
    element: "valid element",
    qtd: 8,
    room_id: 7,
  };
  beforeEach(() => {
    getByIdSpy = jest.spyOn(ActionController.prototype, "getById");
  });
  afterEach(() => {
    getByIdSpy.mockClear();
  });
  test("should respond with JSON data and status 200 when get by id", async () => {
    getByIdSpy.mockResolvedValue(action);

    const response = await request(app).get(`/actions/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(action);
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should respond with status 404 when id not found on get by id", async () => {
    getByIdSpy.mockResolvedValue(null);

    const response = await request(app).get(`/actions/${id}`);

    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Action não encontrado" });
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    getByIdSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get(`/actions/${id}`);

    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter action" });
    expect(response.status).toBe(400);
  });
});

describe("POST /actions/:id", () => {
  let insertSpy: jest.SpyInstance;

  const action = new Action({
    type: "get",
    button_text: "valid button text",
    element: "valid element",
    qtd: 8,
    room_id: 7,
  });
  beforeEach(() => {
    insertSpy = jest.spyOn(ActionController.prototype, "insert");
  });
  afterEach(() => {
    insertSpy.mockClear();
  });
  test("should respond with success when inserted successfully", async () => {
    insertSpy.mockResolvedValue({ success: true });

    const response = await request(app)
      .post(`/actions`)
      .set("Content-type", "application/json")
      .send(action);

    expect(response.status).toBe(201);
    expect(insertSpy).toBeCalledTimes(1);
    expect(insertSpy).toBeCalledWith(action);
  });

  test("should handle errors and respond with JSON data and status 400 on insert", async () => {
    insertSpy.mockResolvedValue({ success: false });

    const response = await request(app)
      .post(`/actions`)
      .set("Content-type", "application/json")
      .send(action);

    expect(insertSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      success: false,
      message: "Erro ao criar action",
    });
    expect(response.status).toBe(400);
  });
});

describe("PUT /actions/:id", () => {
  let updateSpy: jest.SpyInstance;
  const id = 1;
  const action = new Action(
    {
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 7,
    },
    id
  );
  beforeEach(() => {
    updateSpy = jest.spyOn(ActionController.prototype, "update");
  });
  afterEach(() => {
    updateSpy.mockClear();
  });
  test("should respond with success when updated successfully", async () => {
    updateSpy.mockResolvedValue({ success: true });

    const response = await request(app)
      .put(`/actions/${id}`)
      .set("Content-type", "application/json")
      .send(action);

    expect(response.status).toBe(200);
    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toBeCalledWith(action);
  });

  test("should handle errors and respond with JSON data and status 400 on update", async () => {
    updateSpy.mockResolvedValue({ success: false });

    const response = await request(app)
      .put(`/actions/${id}`)
      .set("Content-type", "application/json")
      .send(action);

    expect(updateSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      success: false,
      message: "Erro ao atualizar action",
    });
    expect(response.status).toBe(400);
  });
});

describe("DELETE /actions/:id", () => {
  let deleteSpy: jest.SpyInstance;
  const id = 1;
  beforeEach(() => {
    deleteSpy = jest.spyOn(ActionController.prototype, "delete");
  });
  afterEach(() => {
    deleteSpy.mockClear();
  });
  test("should respond with 200 when deleted", async () => {
    deleteSpy.mockResolvedValue({ success: true });

    const response = await request(app).delete(`/actions/${id}`);

    expect(response.status).toBe(200);
    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
  });

  test("should handle errors and respond with JSON data and status 400 on get by id", async () => {
    const id = 1;
    deleteSpy.mockResolvedValue({ success: false });

    const response = await request(app).delete(`/actions/${id}`);

    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      success: false,
      message: "Erro ao deletar action",
    });
    expect(response.status).toBe(400);
  });
});
