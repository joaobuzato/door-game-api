import { describe, expect, test } from "@jest/globals";
import { ExtendedText } from "../../src/ExtendedText/ExtendedText";

import { ExtendedTextRepository } from "../../src/ExtendedText/ExtendedTextRepository";
import DataBase from "../../src/Infra/DataBase";
import { mock } from "jest-mock-extended";

describe("extendedTextRepository", () => {
  describe("getAll", () => {
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

    const databaseMock = mock<DataBase>();
    const repository = new ExtendedTextRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should getAll correctly", async () => {
      databaseMock.query.mockResolvedValue(extendedTexts);
      const result = await repository.getAll();
      expect(result).toEqual(extendedTexts);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM extended_texts"
      );
    });
    test("should throw if promise rejected", async () => {
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));
      await expect(repository.getAll()).rejects.toThrow(errorMessage);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM extended_texts"
      );
    });
  });
});
