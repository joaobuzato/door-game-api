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
      const errorMessage = "Repository Call Error";
      repositoryMock.getAll.mockRejectedValue(new Error(errorMessage));

      await expect(service.getAll()).rejects.toThrow(errorMessage);
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
      const errorMessage = "Repository Call Error";
      repositoryMock.getById.mockRejectedValue(new Error(errorMessage));

      await expect(service.getById(id)).rejects.toThrow(errorMessage);
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
      repositoryMock.insert.mockResolvedValue();

      await service.insert(condition);

      expect(repositoryMock.insert).toBeCalledWith(condition);
    });
    test("should throw error if text is not valid", async () => {
      const conditionTest = { ...condition, element1: "" };
      await expect(service.insert(conditionTest)).rejects.toThrow(
        "condition Inválido"
      );
      expect(repositoryMock.insert).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      repositoryMock.insert.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(service.insert(condition)).rejects.toThrow(errorMessage);
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
    test("should update Correctly", async () => {
      repositoryMock.update.mockResolvedValue();

      await service.update(condition);

      expect(repositoryMock.update).toBeCalledWith(condition);
    });
    test("should throw error if text is not valid", async () => {
      const conditionTest = { ...condition, element2: "" };
      await expect(service.update(conditionTest)).rejects.toThrow(
        "condition Inválido"
      );
      expect(repositoryMock.update).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      repositoryMock.update.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(service.update(condition)).rejects.toThrow(errorMessage);
      expect(repositoryMock.update).toBeCalledWith(condition);
    });
  });
  describe("delete", () => {
    const id = 1;
    beforeEach(() => {
      repositoryMock.delete.mockClear();
    });
    test("should delete correctly", async () => {
      repositoryMock.delete.mockResolvedValue();

      await service.delete(id);

      expect(repositoryMock.delete).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      repositoryMock.delete.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(service.delete(id)).rejects.toThrow(errorMessage);
      expect(repositoryMock.delete).toBeCalledWith(id);
    });
  });
});
