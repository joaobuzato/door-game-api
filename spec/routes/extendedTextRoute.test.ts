import request from "supertest";
import { app } from "../../src/app";
import { ExtendedText } from "../../src/ExtendedText/ExtendedText";
import ExtendedTextController from "../../src/ExtendedText/ExtendedTextController";
jest.mock("../../src/ExtendedText/ExtendedTextController");

describe("GET /extendedTexts", () => {
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
  test("should respond with JSON data and status 200", async () => {
    jest
      .spyOn(ExtendedTextController.prototype, "getAll")
      .mockResolvedValue(extendedTexts);
    const response = await request(app).get("/extendedTexts");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual(extendedTexts);
    // Add any additional assertions for the response body, if necessary
  });

  test("should handle errors and respond with JSON data and status 400", async () => {
    // Mocking the controller to throw an error
    jest
      .spyOn(ExtendedTextController.prototype, "getAll")
      .mockRejectedValue(new Error("error"));
    const response = await request(app).get("/extendedTexts");

    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Erro ao obter extendedTexts" });
    expect(response.status).toBe(400);
  });
});
