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
      controller.service.getAll = jest
        .fn()
        .mockImplementationOnce(() => extendedTexts);

      const result = await controller.getAll();

      expect(result).toEqual(extendedTexts);
    });
    test("should propagate error if there is a throw in Service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.getAll = jest.fn().mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.getAll()).rejects.toThrow(errorMessage);
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
      controller.service.getById = jest
        .fn()
        .mockImplementationOnce(() => extendedText);

      const result = await controller.getById(id);

      expect(result).toEqual(extendedText);
      expect(controller.service.getById).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in Service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.getById = jest.fn().mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.getById(id)).rejects.toThrow(errorMessage);
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
      const errorMessage = "Service Call Error";
      controller.service.insert = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.insert(extendedText)).rejects.toThrow(
        errorMessage
      );
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
      const errorMessage = "Service Call Error";
      controller.service.update = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.update(extendedText)).rejects.toThrow(
        errorMessage
      );
      expect(controller.service.update).toBeCalledWith(extendedText);
    });
  });
  describe("delete", () => {
    const id = 1;
    test("should delete correctly", async () => {
      controller.service.delete = jest.fn();

      await controller.delete(id);

      expect(controller.service.delete).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      controller.service.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.delete(id)).rejects.toThrow(errorMessage);
      expect(controller.service.delete).toBeCalledWith(id);
    });
  });
});
