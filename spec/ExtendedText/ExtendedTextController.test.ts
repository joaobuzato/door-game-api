import { describe, expect, test } from "@jest/globals";
import { ExtendedText } from "../../src/ExtendedText/ExtendedText";

import ExtendedTextController from "../../src/ExtendedText/ExtendedTextController";
jest.mock("../../src/ExtendedText/ExtendedTextService");

describe("extendedTextRepository", () => {
  const controller = new ExtendedTextController();

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

    test("should getAll Correctly", async () => {
      controller.service.getAll = jest.fn().mockResolvedValue(extendedTexts);

      const result = await controller.getAll();

      expect(result).toEqual(extendedTexts);
    });
    test("should propagate error if there is a throw in Service", async () => {
      controller.service.getAll = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.getAll()).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.getAll).toBeCalledTimes(1);
    });
  });
  describe("getById", () => {
    const extendedText: ExtendedText = {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    };
    const id = 1;
    test("should getById Correctly", async () => {
      controller.service.getById = jest.fn().mockResolvedValue(extendedText);

      const result = await controller.getById(id);

      expect(result).toEqual(extendedText);
      expect(controller.service.getById).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in Service", async () => {
      controller.service.getById = jest.fn().mockRejectedValue(null);
      await expect(controller.getById(id)).rejects.toStrictEqual(null);
      expect(controller.service.getById).toBeCalledTimes(1);
    });
  });
  describe("insert", () => {
    const extendedText: ExtendedText = {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    };
    test("should insert Correctly", async () => {
      controller.service.insert = jest.fn();

      await controller.insert(extendedText);

      expect(controller.service.insert).toBeCalledWith(extendedText);
    });
    test("should propagate error if there is a throw in service", async () => {
      controller.service.insert = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.insert(extendedText)).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.insert).toBeCalledWith(extendedText);
    });
  });
  describe("update", () => {
    const extendedText: ExtendedText = {
      id: 1,
      sentence: "sentence1",
      text: "text1",
      room_id: 1,
    };
    test("should update Correctly", async () => {
      controller.service.update = jest.fn();

      await controller.update(extendedText);

      expect(controller.service.update).toBeCalledWith(extendedText);
    });
    test("should propagate error if there is a throw in service", async () => {
      controller.service.update = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.update(extendedText)).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.update).toBeCalledWith(extendedText);
    });
  });
  describe("delete", () => {
    const id = 1;
    test("should delete correctly", async () => {
      controller.service.delete = jest
        .fn()
        .mockResolvedValue({ success: true });

      await controller.delete(id);

      expect(controller.service.delete).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in repository", async () => {
      controller.service.delete = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.delete(id)).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.delete).toBeCalledWith(id);
    });
  });
});
