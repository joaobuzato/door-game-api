import { describe, expect, test } from "@jest/globals";
import { Room } from "../../src/Room/Room";

import RoomController from "../../src/Room/RoomController";
jest.mock("../../src/Room/RoomService");

describe("roomRepository", () => {
  const controller = new RoomController();

  describe("getAll", () => {
    const rooms: Room[] = [
      {
        id: 1,
        title: "title",
        text: "text",
        path: "path",
        actions: [],
        doors: [],
        extendedTexts: [],
      },
      {
        id: 2,
        title: "title 45",
        text: "texasdasdast",
        path: "paasdasdth",
        actions: [],
        doors: [],
        extendedTexts: [],
      },
    ];

    test("should getAll Correctly", async () => {
      controller.service.getAll = jest.fn().mockResolvedValue(rooms);

      const result = await controller.getAll();

      expect(result).toEqual(rooms);
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
    const room: Room = {
      id: 1,
      title: "title",
      text: "text",
      path: "path",
      actions: [],
      doors: [],
      extendedTexts: [],
    };
    const id = 1;
    test("should getById Correctly", async () => {
      controller.service.getById = jest.fn().mockResolvedValue(room);

      const result = await controller.getById(id);

      expect(result).toEqual(room);
      expect(controller.service.getById).toBeCalledWith(id);
    });
    test("should propagate error if there is a throw in Service", async () => {
      controller.service.getById = jest.fn().mockRejectedValue(null);
      await expect(controller.getById(id)).rejects.toStrictEqual(null);
      expect(controller.service.getById).toBeCalledTimes(1);
    });
  });
  describe("insert", () => {
    const room: Room = {
      id: 1,
      title: "title",
      text: "text",
      path: "path",
      actions: [],
      doors: [],
      extendedTexts: [],
    };
    test("should insert Correctly", async () => {
      controller.service.insert = jest.fn();

      await controller.insert(room);

      expect(controller.service.insert).toBeCalledWith(room);
    });
    test("should propagate error if there is a throw in service", async () => {
      controller.service.insert = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.insert(room)).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.insert).toBeCalledWith(room);
    });
  });
  describe("update", () => {
    const room: Room = {
      id: 1,
      title: "title",
      text: "text",
      path: "path",
      actions: [],
      doors: [],
      extendedTexts: [],
    };
    test("should update Correctly", async () => {
      controller.service.update = jest.fn();

      await controller.update(room);

      expect(controller.service.update).toBeCalledWith(room);
    });
    test("should propagate error if there is a throw in service", async () => {
      controller.service.update = jest
        .fn()
        .mockRejectedValue({ success: false });

      await expect(controller.update(room)).rejects.toStrictEqual({
        success: false,
      });
      expect(controller.service.update).toBeCalledWith(room);
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
