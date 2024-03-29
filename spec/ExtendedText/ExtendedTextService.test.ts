import { describe, expect, test } from "@jest/globals";
import { ExtendedText } from "../../src/ExtendedText/ExtendedText";

import { ExtendedTextRepository } from "../../src/ExtendedText/ExtendedTextRepository";
import { ExtendedTextService } from "../../src/ExtendedText/ExtendedTextService";
import { mock } from "jest-mock-extended";

describe("extendedTextRepository", () => {
  const repositoryMock = mock<ExtendedTextRepository>();
  const service = new ExtendedTextService(repositoryMock);
  describe("validate", () => {
    const bigSentence =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const bigText =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    test.each([
      { id: 0, sentence: "", text: "", room_id: 0 },
      { id: 0, sentence: "valid", text: "", room_id: 0 },
      { id: 0, sentence: "valid", text: "valid", room_id: 0 },
      { id: 0, sentence: "", text: "valid", room_id: 1 },
      { id: 0, sentence: "", text: "", room_id: 1 },
      { id: 0, sentence: bigSentence, text: "", room_id: 1 },
      { id: 0, sentence: bigSentence, text: bigText, room_id: 1 },
      { id: 0, sentence: bigSentence, text: "valid", room_id: 1 },
      { id: 0, sentence: "valid", text: bigText, room_id: 1 },
    ])("should return invalid if extendedText is not valid", (extendedText) => {
      const isValid = service.validate(extendedText);
      expect(isValid).toBe(false);
    });
  });

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
    beforeEach(() => {
      repositoryMock.getAll.mockClear();
    });
    test("should getAll Correctly", async () => {
      repositoryMock.getAll.mockResolvedValue(extendedTexts);

      const result = await service.getAll();

      expect(result).toEqual(extendedTexts);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      repositoryMock.getAll.mockRejectedValue(new Error(errorMessage));

      await expect(service.getAll()).rejects.toThrow(errorMessage);
      expect(repositoryMock.getAll).toBeCalledTimes(1);
    });
  });
  describe("getById", () => {
    const extendedText: ExtendedText = {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    };
    beforeEach(() => {
      repositoryMock.getById.mockClear();
    });
    test("should getById Correctly", async () => {
      const id = 1;
      repositoryMock.getById.mockResolvedValue(extendedText);

      const result = await service.getById(id);

      expect(result).toEqual(extendedText);
      expect(repositoryMock.getById).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const id = 1;
      const errorMessage = "Repository Call Error";
      repositoryMock.getById.mockRejectedValue(new Error(errorMessage));

      await expect(service.getById(id)).rejects.toThrow(errorMessage);
      expect(repositoryMock.getById).toBeCalledWith(id);
    });
  });
  describe("insert", () => {
    const extendedText: ExtendedText = {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    };
    beforeEach(() => {
      repositoryMock.insert.mockClear();
    });
    test("should insert Correctly", async () => {
      repositoryMock.insert.mockResolvedValue({ lastId: 0, success: true });

      await service.insert(extendedText);

      expect(repositoryMock.insert).toBeCalledWith(extendedText);
    });
    test("should reject promise if text is not valid", async () => {
      const extendedTextTest = { ...extendedText, text: "" };
      await expect(service.insert(extendedTextTest)).resolves.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.insert.mockRejectedValue({ lastId: 0, success: false });

      await expect(service.insert(extendedText)).rejects.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledWith(extendedText);
    });
  });
  describe("update", () => {
    const extendedText: ExtendedText = {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    };
    beforeEach(() => {
      repositoryMock.update.mockClear();
    });
    test("should update Correctly", async () => {
      repositoryMock.update.mockResolvedValue({ success: false });

      await service.update(extendedText);

      expect(repositoryMock.update).toBeCalledWith(extendedText);
    });
    test("should reject if text is not valid", async () => {
      const extendedTextTest = { ...extendedText, text: "" };
      await expect(service.update(extendedTextTest)).resolves.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.update.mockRejectedValue({ success: false });

      await expect(service.update(extendedText)).rejects.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledWith(extendedText);
    });
  });
  describe("delete", () => {
    const id = 1;
    beforeEach(() => {
      repositoryMock.delete.mockClear();
    });
    test("should delete correctly", async () => {
      repositoryMock.delete.mockResolvedValue({ success: false });

      await service.delete(id);

      expect(repositoryMock.delete).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.delete.mockRejectedValue({ success: false });

      await expect(service.delete(id)).rejects.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.delete).toBeCalledWith(id);
    });
  });
});
