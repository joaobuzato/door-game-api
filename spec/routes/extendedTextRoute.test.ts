import request from "supertest";
import { app } from "../../src/app";
import { ExtendedText } from "../../src/ExtendedText/ExtendedText";
import ExtendedTextController from "../../src/ExtendedText/ExtendedTextController";
jest.mock("../../src/ExtendedText/ExtendedTextController");

describe("GET /extendedTexts", () => {
  let getAllSpy: jest.SpyInstance;
  const extendedTexts: ExtendedText[] = [
    {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    },
    {
      id: 2,
      sentence: "sentence2",
      text: "text2",
      room_id: 2,
    },
  ];
  beforeEach(() => {
    getAllSpy = jest.spyOn(ExtendedTextController.prototype, "getAll");
  });
  afterEach(() => {
    getAllSpy.mockClear();
  });
  test("should respond with JSON data and status 200", async () => {
    getAllSpy.mockResolvedValue(extendedTexts);

    const response = await request(app).get("/extendedTexts");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(extendedTexts);
  });

  test("should handle errors and respond with JSON data and status 400", async () => {
    getAllSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get("/extendedTexts");

    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter extendedTexts" });
    expect(response.status).toBe(400);
  });
});

describe("GET /extendedTexts/:id", () => {
  let getByIdSpy: jest.SpyInstance;
  const id = 1;
  const extendedText: ExtendedText = {
    id: 1,
    sentence: "sentence1",
    text: "text1",
    room_id: 1,
  };
  beforeEach(() => {
    getByIdSpy = jest.spyOn(ExtendedTextController.prototype, "getById");
  });
  afterEach(() => {
    getByIdSpy.mockClear();
  });
  test("should respond with JSON data and status 200", async () => {
    getByIdSpy.mockResolvedValue(extendedText);

    const response = await request(app).get(`/extendedTexts/${id}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(extendedText);
    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
    // Add any additional assertions for the response body, if necessary
  });

  test("should handle errors and respond with JSON data and status 400", async () => {
    const id = 1;
    getByIdSpy.mockRejectedValue(new Error("error"));

    const response = await request(app).get(`/extendedTexts/${id}`);

    expect(getByIdSpy).toBeCalledTimes(1);
    expect(getByIdSpy).toBeCalledWith(id);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter extendedText" });
    expect(response.status).toBe(400);
  });
});

describe("POST /extendedTexts", () => {
  let insertSpy: jest.SpyInstance;
  const id = 1;
  const extendedText = new ExtendedText({
    sentence: "sentence1",
    text: "text1",
    room_id: 1,
  });
  beforeEach(() => {
    insertSpy = jest.spyOn(ExtendedTextController.prototype, "insert");
  });
  afterEach(() => {
    insertSpy.mockClear();
  });
  test("should respond with success when inserted successfully", async () => {
    insertSpy.mockResolvedValue(null);

    const response = await request(app)
      .post(`/extendedTexts`)
      .set("Content-type", "application/json")
      .send(extendedText);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(insertSpy).toBeCalledTimes(1);
    expect(insertSpy).toBeCalledWith(extendedText);
    // Add any additional assertions for the response body, if necessary
  });

  test("should handle errors and respond with JSON data and status 400", async () => {
    insertSpy.mockRejectedValue(new Error("error"));

    const response = await request(app)
      .post(`/extendedTexts`)
      .set("Content-type", "application/json")
      .send(extendedText);

    expect(insertSpy).toBeCalledTimes(1);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao salvar extendedText" });
    expect(response.status).toBe(400);
  });
});
