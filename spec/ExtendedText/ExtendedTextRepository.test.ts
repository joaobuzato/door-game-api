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
    test("should reject if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue({ success: false });

      await expect(repository.getAll()).rejects.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM extended_texts"
      );
    });
  });
  describe("getById", () => {
    const extendedTexts: ExtendedText[] = [
      {
        id: 1,
        sentence: "sentence1",
        text: "text1",
        room_id: 1,
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new ExtendedTextRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should getById correctly", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue(extendedTexts);

      const result = await repository.getById(id);

      expect(result).toEqual(extendedTexts[0]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM extended_texts WHERE id = ?",
        [id]
      );
    });
    test("should throw if promise is rejected", async () => {
      const id = 1;
      databaseMock.query.mockRejectedValue({ success: false });

      await expect(repository.getById(id)).rejects.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM extended_texts WHERE id = ?",
        [id]
      );
    });
    test("should return null if there is no extendedText", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue([]);

      const result = await repository.getById(id);

      expect(result).toEqual(null);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM extended_texts WHERE id = ?",
        [id]
      );
    });
  });
  describe("insert", () => {
    const databaseMock = mock<DataBase>();
    const repository = new ExtendedTextRepository(databaseMock);

    const extendedText = new ExtendedText({
      sentence: "sentence",
      room_id: 1,
      text: "text",
    });

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should insert correctly", async () => {
      databaseMock.query.mockResolvedValue([{ id: 1 }]);

      await repository.insert(extendedText);

      expect(databaseMock.query).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO extended_texts (sentence, text, room_id) VALUES (?,?,?)",
        [extendedText.sentence, extendedText.text, extendedText.room_id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.insert(extendedText)).resolves.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "INSERT INTO extended_texts (sentence, text, room_id) VALUES (?,?,?)",
        [extendedText.sentence, extendedText.text, extendedText.room_id]
      );
    });
  });
  describe("update", () => {
    const extendedText: ExtendedText = {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    };

    const databaseMock = mock<DataBase>();
    const repository = new ExtendedTextRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should update correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await expect(repository.update(extendedText)).resolves.toStrictEqual({
        success: true,
      });

      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE extended_texts SET sentence = ?, text = ?, room_id = ? WHERE id = ?",
        [
          extendedText.sentence,
          extendedText.text,
          extendedText.room_id,
          extendedText.id,
        ]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);
      const extendedText = new ExtendedText({
        sentence: "sentence",
        room_id: 1,
        text: "text",
      });

      await expect(repository.update(extendedText)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE extended_texts SET sentence = ?, text = ?, room_id = ? WHERE id = ?",
        [
          extendedText.sentence,
          extendedText.text,
          extendedText.room_id,
          extendedText.id,
        ]
      );
    });
  });
  describe("delete", () => {
    const id = 1;

    const databaseMock = mock<DataBase>();
    const repository = new ExtendedTextRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should delete correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: true,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM extended_texts WHERE id = ?",
        [id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM extended_texts WHERE id = ?",
        [id]
      );
    });
  });
});
