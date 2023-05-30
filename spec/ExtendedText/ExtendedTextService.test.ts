import { describe, expect, test } from "@jest/globals";
import { ExtendedText } from "../../src/ExtendedText/ExtendedText";

import { ExtendedTextRepository } from "../../src/ExtendedText/ExtendedTextRepository";
import { ExtendedTextService } from "../../src/ExtendedText/ExtendedTextService";
import { mock } from "jest-mock-extended";

describe("extendedTextRepository", () => {
  describe("getAll", () => {
    const repositoryMock = mock<ExtendedTextRepository>();
    const service = new ExtendedTextService(repositoryMock);
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
      repositoryMock.getAll.mockClear();
    });
    test("should getAll Correctly", async () => {
      repositoryMock.getAll.mockResolvedValue(extendedTexts);

      const result = await service.getAll();

      expect(result).toEqual(extendedTexts);
    });
  });
});
