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
    databaseMock.query.mockResolvedValue(extendedTexts);
    const repository = new ExtendedTextRepository(databaseMock);

    beforeEach(() => {});
    test("should getAll correctly", async () => {
      const result = await repository.getAll();
      expect(result).toEqual(extendedTexts);
    });
  });
});
