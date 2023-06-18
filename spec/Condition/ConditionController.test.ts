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
      controller.service.getAll = jest.fn().mockResolvedValue(conditions);

      const result = await controller.getAll();

      expect(result).toEqual(conditions);
    });
    test("should propagate error if there is a throw in Service", async () => {
      controller.service.getAll = jest.fn().mockRejectedValue([]);

      await expect(controller.getAll()).rejects.toStrictEqual([]);
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
      controller.service.getById = jest.fn().mockResolvedValue(condition);

      const result = await controller.getById(id);

      expect(result).toEqual(condition);
      expect(controller.service.getById).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in Service", async () => {
      controller.service.getById = jest.fn().mockRejectedValue(null);
      await expect(controller.getById(id)).rejects.toStrictEqual(null);
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
      controller.service.insert = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.insert(condition)).rejects.toStrictEqual({
        success: false,
      });
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
      controller.service.update = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.update(condition)).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.update).toBeCalledWith(condition);
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
