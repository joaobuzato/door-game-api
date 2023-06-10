import { describe, expect, test } from "@jest/globals";
import { Door } from "../../src/Door/Door";

import DoorController from "../../src/Door/DoorController";
jest.mock("../../src/Door/DoorService");

describe("doorRepository", () => {
  const controller = new DoorController();

  describe("getAll", () => {
    const doors: Door[] = [
      {
        id: 1,
        path: "path",
        color: "#000000",
        room_id: 2,
      },
      {
        id: 2,
        path: "path",
        color: "#033000",
        room_id: 5,
      },
    ];

    test("should getAll Correctly", async () => {
      controller.service.getAll = jest.fn().mockImplementationOnce(() => doors);

      const result = await controller.getAll();

      expect(result).toEqual(doors);
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
    const door: Door = {
      id: 1,
      path: "path",
      color: "#000000",
      room_id: 2,
    };
    const id = 1;
    test("should getById Correctly", async () => {
      controller.service.getById = jest.fn().mockImplementationOnce(() => door);

      const result = await controller.getById(id);

      expect(result).toEqual(door);
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
    const door: Door = {
      id: 1,
      path: "path",
      color: "#000000",
      room_id: 2,
    };
    test("should insert Correctly", async () => {
      controller.service.insert = jest.fn();

      await controller.insert(door);

      expect(controller.service.insert).toBeCalledWith(door);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.insert = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.insert(door)).rejects.toThrow(errorMessage);
      expect(controller.service.insert).toBeCalledWith(door);
    });
  });
  describe("update", () => {
    const door: Door = {
      id: 1,
      path: "path",
      color: "#000000",
      room_id: 2,
    };
    test("should update Correctly", async () => {
      controller.service.update = jest.fn();

      await controller.update(door);

      expect(controller.service.update).toBeCalledWith(door);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.update = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.update(door)).rejects.toThrow(errorMessage);
      expect(controller.service.update).toBeCalledWith(door);
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
