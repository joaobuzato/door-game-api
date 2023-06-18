import { describe, expect, test } from "@jest/globals";
import { Action } from "../../src/Action/Action";

import { ActionRepository } from "../../src/Action/ActionRepository";
import { ActionService } from "../../src/Action/ActionService";
import { mock } from "jest-mock-extended";

describe("actionService", () => {
  const repositoryMock = mock<ActionRepository>();
  const service = new ActionService(repositoryMock);
  describe("validate", () => {
    const bigText =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    test.each([
      {
        id: 1,
        type: "notGet",
        button_text: "button_text",
        element: "element",
        qtd: 4,
        room_id: 1,
      },
      {
        id: 2,
        type: "get",
        button_text: "",
        element: "element 2 ",
        qtd: 8,
        room_id: 1,
      },
      {
        id: 2,
        type: "get",
        button_text: "valid button text",
        element: "",
        qtd: 8,
        room_id: 1,
      },
      {
        id: 2,
        type: "get",
        button_text: "valid button text",
        element: "valid element",
        qtd: 0,
        room_id: 1,
      },
      {
        id: 2,
        type: "get",
        button_text: "valid button text",
        element: "valid element",
        qtd: 8,
        room_id: 0,
      },
      {
        id: 2,
        type: "get",
        button_text: bigText,
        element: "valid element",
        qtd: 8,
        room_id: 0,
      },
      {
        id: 2,
        type: "get",
        button_text: "valid button text",
        element: bigText,
        qtd: 8,
        room_id: 0,
      },
    ])("should return invalid if action is not valid", (action) => {
      const isValid = service.validate(action);
      expect(isValid).toBe(false);
    });
  });

  describe("getAll", () => {
    const actions: Action[] = [
      {
        id: 2,
        type: "get",
        button_text: "valid button text",
        element: "valid element",
        qtd: 8,
        room_id: 7,
      },
      {
        id: 3,
        type: "get",
        button_text: "valid button text",
        element: "valid element",
        qtd: 8,
        room_id: 4,
      },
    ];
    beforeEach(() => {
      repositoryMock.getAll.mockClear();
    });
    test("should getAll Correctly", async () => {
      repositoryMock.getAll.mockResolvedValue(actions);

      const result = await service.getAll();

      expect(result).toEqual(actions);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.getAll.mockRejectedValue([]);

      await expect(service.getAll()).rejects.toStrictEqual([]);
      expect(repositoryMock.getAll).toBeCalledTimes(1);
    });
  });
  describe("getById", () => {
    const id = 2;
    const action: Action = {
      id: 2,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 0,
    };
    beforeEach(() => {
      repositoryMock.getById.mockClear();
    });
    test("should getById Correctly", async () => {
      const id = 1;
      repositoryMock.getById.mockResolvedValue(action);

      const result = await service.getById(id);

      expect(result).toEqual(action);
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
    const action: Action = {
      id: 2,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 1,
    };
    beforeEach(() => {
      repositoryMock.insert.mockClear();
    });
    test("should insert Correctly", async () => {
      repositoryMock.insert.mockResolvedValue({ success: false });

      await service.insert(action);

      expect(repositoryMock.insert).toBeCalledWith(action);
    });
    test("should throw error if element is not valid", async () => {
      const actionTest = { ...action, element: "" };
      await expect(service.insert(actionTest)).resolves.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.insert.mockRejectedValue({ success: false });

      await expect(service.insert(action)).rejects.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledWith(action);
    });
  });
  describe("update", () => {
    const action: Action = {
      id: 2,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 10,
    };
    beforeEach(() => {
      repositoryMock.update.mockClear();
    });
    test("should throw error if element is not valid", async () => {
      const actionTest = { ...action, element: "" };
      await expect(service.update(actionTest)).resolves.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.update.mockRejectedValue({ success: false });

      await expect(service.update(action)).rejects.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledWith(action);
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
