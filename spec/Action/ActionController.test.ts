import { describe, expect, test } from "@jest/globals";
import { Action } from "../../src/Action/Action";

import ActionController from "../../src/Action/ActionController";
jest.mock("../../src/Action/ActionService");

describe("actionRepository", () => {
  const controller = new ActionController();

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

    test("should getAll Correctly", async () => {
      controller.service.getAll = jest
        .fn()
        .mockImplementationOnce(() => actions);

      const result = await controller.getAll();

      expect(result).toEqual(actions);
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
    const action: Action = {
      id: 1,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 7,
    };
    const id = 1;
    test("should getById Correctly", async () => {
      controller.service.getById = jest
        .fn()
        .mockImplementationOnce(() => action);

      const result = await controller.getById(id);

      expect(result).toEqual(action);
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
    const action: Action = {
      id: 2,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 7,
    };
    test("should insert Correctly", async () => {
      controller.service.insert = jest.fn();

      await controller.insert(action);

      expect(controller.service.insert).toBeCalledWith(action);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.insert = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.insert(action)).rejects.toThrow(errorMessage);
      expect(controller.service.insert).toBeCalledWith(action);
    });
  });
  describe("update", () => {
    const action: Action = {
      id: 2,
      type: "get",
      button_text: "valid button text",
      element: "valid element",
      qtd: 8,
      room_id: 7,
    };
    test("should update Correctly", async () => {
      controller.service.update = jest.fn();

      await controller.update(action);

      expect(controller.service.update).toBeCalledWith(action);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.update = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.update(action)).rejects.toThrow(errorMessage);
      expect(controller.service.update).toBeCalledWith(action);
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
