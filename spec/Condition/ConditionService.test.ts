import { describe, expect, test } from "@jest/globals";
import { Condition } from "../../src/Condition/Condition";

import { ConditionRepository } from "../../src/Condition/ConditionRepository";
import { ConditionService } from "../../src/Condition/ConditionService";
import { mock } from "jest-mock-extended";

describe("conditionService", () => {
  const repositoryMock = mock<ConditionRepository>();
  const service = new ConditionService(repositoryMock);
  describe("validate", () => {
    const bigElement = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    test.each([
      { id: 0, element1: "", type: "", element2: "", action_id: 0 },
      {
        id: 0,
        element1: "valid element",
        type: "greater",
        element2: "element valid",
        action_id: 0,
      },
      {
        id: 0,
        element1: "",
        type: "greater",
        element2: "element",
        action_id: 1,
      },
      {
        id: 0,
        element1: "element",
        type: "",
        element2: "element",
        action_id: 1,
      },
      {
        id: 0,
        element1: "valid element",
        type: "",
        element2: "element2",
        action_id: 1,
      },
      {
        id: 0,
        element1: "element 1",
        type: "not greater",
        element2: "element 2",
        action_id: 2,
      },
      {
        id: 0,
        element1: "element",
        type: "lesser",
        element2: bigElement,
        action_id: 1,
      },
      {
        id: 0,
        element1: bigElement,
        type: "equals",
        element2: "",
        action_id: 1,
      },
      {
        id: 0,
        element1: "element",
        type: "not lesser",
        element2: "element2",
        action_id: 1,
      },
    ])("should return invalid if condition is not valid", (condition) => {
      const isValid = service.validate(condition);
      expect(isValid).toBe(false);
    });
  });

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
    beforeEach(() => {
      repositoryMock.getAll.mockClear();
    });
    test("should getAll Correctly", async () => {
      repositoryMock.getAll.mockResolvedValue(conditions);

      const result = await service.getAll();

      expect(result).toEqual(conditions);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.getAll.mockRejectedValue([]);

      await expect(service.getAll()).rejects.toStrictEqual([]);
      expect(repositoryMock.getAll).toBeCalledTimes(1);
    });
  });
  describe("getById", () => {
    const condition: Condition = {
      id: 0,
      element1: "element",
      type: "greater",
      element2: "element2",
      action_id: 1,
    };
    beforeEach(() => {
      repositoryMock.getById.mockClear();
    });
    test("should getById Correctly", async () => {
      const id = 1;
      repositoryMock.getById.mockResolvedValue(condition);

      const result = await service.getById(id);

      expect(result).toEqual(condition);
      expect(repositoryMock.getById).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const id = 1;
      repositoryMock.getById.mockRejectedValue(null);

      await expect(service.getById(id)).rejects.toStrictEqual(null);
      expect(repositoryMock.getById).toBeCalledWith(id);
    });
  });
  describe("insert", () => {
    const condition: Condition = {
      id: 0,
      element1: "element",
      type: "lesser",
      element2: "element2",
      action_id: 1,
    };
    beforeEach(() => {
      repositoryMock.insert.mockClear();
    });
    test("should insert Correctly", async () => {
      repositoryMock.insert.mockResolvedValue({ lastId: 0, success: false });

      await service.insert(condition);

      expect(repositoryMock.insert).toBeCalledWith(condition);
    });
    test("should throw error if element1 is not valid", async () => {
      const conditionTest = { ...condition, element1: "" };
      await expect(service.insert(conditionTest)).resolves.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.insert.mockRejectedValue({ lastId: 0, success: false });

      await expect(service.insert(condition)).rejects.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledWith(condition);
    });
  });
  describe("update", () => {
    const condition: Condition = {
      id: 0,
      element1: "element",
      type: "equals",
      element2: "element2",
      action_id: 1,
    };
    beforeEach(() => {
      repositoryMock.update.mockClear();
    });
    test("should throw error if element1 is not valid", async () => {
      const conditionTest = { ...condition, element1: "" };
      await expect(service.update(conditionTest)).resolves.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.update.mockRejectedValue({ success: false });

      await expect(service.update(condition)).rejects.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledWith(condition);
    });
  });
  describe("delete", () => {
    const id = 1;
    beforeEach(() => {
      repositoryMock.delete.mockClear();
    });
    test("should delete correctly", async () => {
      repositoryMock.delete.mockResolvedValue({ success: true });

      await service.delete(id);

      expect(repositoryMock.delete).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.delete.mockResolvedValue({ success: false });

      await expect(service.delete(id)).resolves.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.delete).toBeCalledWith(id);
    });
  });
});
