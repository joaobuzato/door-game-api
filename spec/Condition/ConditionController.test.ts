import { describe, expect, test } from "@jest/globals";
import { Condition } from "../../src/Condition/Condition";

import ConditionController from "../../src/Condition/ConditionController";
jest.mock("../../src/Condition/ConditionService");

describe("conditionRepository", () => {
  const controller = new ConditionController();

  describe("getAll", () => {
    const conditions: Condition[] = [
      {
        id: 1,
        element1: "element",
        type: "greater",
        element2: "element2",
        action_id: 1,
      },
      {
        id: 2,
        element1: "element",
        type: "lesser",
        element2: "element2",
        action_id: 1,
      },
    ];

    test("should getAll Correctly", async () => {
      controller.service.getAll = jest
        .fn()
        .mockImplementationOnce(() => conditions);

      const result = await controller.getAll();

      expect(result).toEqual(conditions);
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
    const condition: Condition = {
      id: 1,
      element1: "element",
      type: "greater",
      element2: "element2",
      action_id: 1,
    };
    const id = 1;
    test("should getById Correctly", async () => {
      controller.service.getById = jest
        .fn()
        .mockImplementationOnce(() => condition);

      const result = await controller.getById(id);

      expect(result).toEqual(condition);
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
    const condition: Condition = {
      id: 1,
      element1: "element",
      type: "greater",
      element2: "element2",
      action_id: 1,
    };
    test("should insert Correctly", async () => {
      controller.service.insert = jest.fn();

      await controller.insert(condition);

      expect(controller.service.insert).toBeCalledWith(condition);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.insert = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.insert(condition)).rejects.toThrow(errorMessage);
      expect(controller.service.insert).toBeCalledWith(condition);
    });
  });
  describe("update", () => {
    const condition: Condition = {
      id: 1,
      element1: "element",
      type: "greater",
      element2: "element2",
      action_id: 1,
    };
    test("should update Correctly", async () => {
      controller.service.update = jest.fn();

      await controller.update(condition);

      expect(controller.service.update).toBeCalledWith(condition);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.update = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.update(condition)).rejects.toThrow(errorMessage);
      expect(controller.service.update).toBeCalledWith(condition);
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
