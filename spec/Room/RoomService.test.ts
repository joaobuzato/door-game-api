import { describe, expect, test } from "@jest/globals";
import { Room } from "../../src/Room/Room";

import { RoomRepository } from "../../src/Room/RoomRepository";
import { RoomService } from "../../src/Room/RoomService";
import { mock } from "jest-mock-extended";

describe("roomService", () => {
  const repositoryMock = mock<RoomRepository>();
  const service = new RoomService(repositoryMock);
  describe("validate", () => {
    const bigTitle = "a".repeat(141);
    const bigText = "a".repeat(1001);
    const bigPath = "a".repeat(13);

    test.each([
      { id: 0, title: "", text: "", path: "" },
      { id: 0, title: bigTitle, text: "aaaaa", path: "aaaaa" },
      { id: 0, title: "title", text: bigText, path: "title" },
      { id: 0, title: "title", text: "text", path: bigPath },
      { id: 0, title: "", text: "text", path: "path" },
      { id: 0, title: "title", text: "", path: "path" },
      { id: 0, title: "title", text: "text", path: "" },
    ])("should return invalid if room is not valid", (room) => {
      const isValid = service.validate(room);
      expect(isValid).toBe(false);
    });
  });

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
    beforeEach(() => {
      repositoryMock.getAll.mockClear();
    });
    test("should getAll Correctly", async () => {
      repositoryMock.getAll.mockResolvedValue(rooms);

      const result = await service.getAll();

      expect(result).toEqual(rooms);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      repositoryMock.getAll.mockRejectedValue(new Error(errorMessage));

      await expect(service.getAll()).rejects.toThrow(errorMessage);
      expect(repositoryMock.getAll).toBeCalledTimes(1);
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
    beforeEach(() => {
      repositoryMock.getById.mockClear();
    });
    test("should getById Correctly", async () => {
      const id = 1;
      repositoryMock.getById.mockResolvedValue(room);

      const result = await service.getById(id);

      expect(result).toEqual(room);
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
    const room: Room = new Room(
      {
        title: "title",
        text: "text",
        path: "path",
        actions: [],
        doors: [],
        rooms: [],
      },
      1
    );
    beforeEach(() => {
      repositoryMock.insert.mockClear();
    });
    test("should insert Correctly", async () => {
      repositoryMock.insert.mockResolvedValue();

      await service.insert(room);

      expect(repositoryMock.insert).toBeCalledWith(room);
    });
    test("should throw error if text is not valid", async () => {
      const roomTest = { ...room, title: "" };
      await expect(service.insert(roomTest)).rejects.toThrow("room Inválido");
      expect(repositoryMock.insert).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      repositoryMock.insert.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(service.insert(room)).rejects.toThrow(errorMessage);
      expect(repositoryMock.insert).toBeCalledWith(room);
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
    beforeEach(() => {
      repositoryMock.update.mockClear();
    });
    test("should update Correctly", async () => {
      repositoryMock.update.mockResolvedValue();

      await service.update(room);

      expect(repositoryMock.update).toBeCalledWith(room);
    });
    test("should throw error if text is not valid", async () => {
      const roomTest = { ...room, title: "" };
      await expect(service.update(roomTest)).rejects.toThrow("room Inválido");
      expect(repositoryMock.update).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      const errorMessage = "Repository Call Error";
      repositoryMock.update.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(service.update(room)).rejects.toThrow(errorMessage);
      expect(repositoryMock.update).toBeCalledWith(room);
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
