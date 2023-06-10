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
        rooms: [],
      },
      {
        id: 2,
        title: "title 45",
        text: "texasdasdast",
        path: "paasdasdth",
        actions: [],
        doors: [],
        rooms: [],
      },
    ];

    test("should getAll Correctly", async () => {
      controller.service.getAll = jest.fn().mockImplementationOnce(() => rooms);

      const result = await controller.getAll();

      expect(result).toEqual(rooms);
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
    const room: Room = {
      id: 1,
      title: "title",
      text: "text",
      path: "path",
      actions: [],
      doors: [],
      rooms: [],
    };
    const id = 1;
    test("should getById Correctly", async () => {
      controller.service.getById = jest.fn().mockImplementationOnce(() => room);

      const result = await controller.getById(id);

      expect(result).toEqual(room);
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
    const room: Room = {
      id: 1,
      title: "title",
      text: "text",
      path: "path",
      actions: [],
      doors: [],
      rooms: [],
    };
    test("should insert Correctly", async () => {
      controller.service.insert = jest.fn();

      await controller.insert(room);

      expect(controller.service.insert).toBeCalledWith(room);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.insert = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.insert(room)).rejects.toThrow(errorMessage);
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
      rooms: [],
    };
    test("should update Correctly", async () => {
      controller.service.update = jest.fn();

      await controller.update(room);

      expect(controller.service.update).toBeCalledWith(room);
    });
    test("should propagate error if there is a throw in service", async () => {
      const errorMessage = "Service Call Error";
      controller.service.update = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(controller.update(room)).rejects.toThrow(errorMessage);
      expect(controller.service.update).toBeCalledWith(room);
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
