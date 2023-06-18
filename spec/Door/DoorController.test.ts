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
      controller.service.getAll = jest.fn().mockResolvedValue(doors);

      const result = await controller.getAll();

      expect(result).toEqual(doors);
    });
    test("should propagate error if there is a throw in Service", async () => {
      controller.service.getAll = jest.fn().mockRejectedValue([]);

      await expect(controller.getAll()).rejects.toStrictEqual([]);
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
      controller.service.getById = jest.fn().mockResolvedValue(door);

      const result = await controller.getById(id);

      expect(result).toEqual(door);
      expect(controller.service.getById).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in Service", async () => {
      controller.service.getById = jest.fn().mockRejectedValue(null);
      await expect(controller.getById(id)).rejects.toStrictEqual(null);
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
      controller.service.insert = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.insert(door)).rejects.toStrictEqual({
        success: false,
      });
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
      controller.service.update = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.update(door)).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.update).toBeCalledWith(door);
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
