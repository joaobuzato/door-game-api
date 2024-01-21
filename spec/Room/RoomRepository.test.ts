import { describe, expect, test } from "@jest/globals";
import { Room } from "../../src/Room/Room";

import { RoomRepository } from "../../src/Room/RoomRepository";
import DataBase from "../../src/Infra/DataBase";
import { mock } from "jest-mock-extended";
import { OkPacket } from "mysql";

describe("RoomRepository", () => {
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
      {
        id: 3,
        title: "title 3",
        text: "texasdasdt",
        path: "path",
        actions: [],
        doors: [],
        extendedTexts: [],
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      databaseMock.insertQuery.mockClear();
      repository.actionRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.doorRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.extendedTextRepository.getByRoomId = jest
        .fn()
        .mockResolvedValue([]);
    });
    test("should getAll correctly", async () => {
      databaseMock.query.mockResolvedValue(rooms);

      const result = await repository.getAll();

      expect(result).toEqual(rooms);
      expect(databaseMock.query).toHaveBeenCalledWith("SELECT * FROM rooms");
    });
    test("should reject if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getAll()).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith("SELECT * FROM rooms");
    });
  });
  describe("getById", () => {
    const rooms: Room[] = [
      {
        id: 3,
        title: "title 3",
        text: "texasdasdt",
        path: "path",
        actions: [],
        doors: [],
        extendedTexts: [],
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      repository.actionRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.doorRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.extendedTextRepository.getByRoomId = jest
        .fn()
        .mockResolvedValue([]);
    });
    test("should getById correctly", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue(rooms);

      const result = await repository.getById(id);

      expect(result).toEqual(rooms[0]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM rooms WHERE id = ?",
        [id]
      );
    });
    test("should reject if promise is rejected", async () => {
      const id = 1;

      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getById(id)).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM rooms WHERE id = ?",
        [id]
      );
    });
    test("should return null if there is no room", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue([]);

      const result = await repository.getById(id);

      expect(result).toEqual(null);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM rooms WHERE id = ?",
        [id]
      );
    });
  });
  describe("getByPath", () => {
    const rooms: Room[] = [
      {
        id: 3,
        title: "title 3",
        text: "texasdasdt",
        path: "path",
        actions: [],
        doors: [],
        extendedTexts: [],
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      repository.actionRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.doorRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.extendedTextRepository.getByRoomId = jest
        .fn()
        .mockResolvedValue([]);
    });
    test("should getByPath correctly", async () => {
      const path = "path";
      databaseMock.query.mockResolvedValue(rooms);

      const result = await repository.getByPath(path);

      expect(result).toEqual(rooms[0]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM rooms WHERE path = ?",
        [path]
      );
    });
    test("should reject if promise is rejected", async () => {
      const path = "path";

      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getByPath(path)).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM rooms WHERE path = ?",
        [path]
      );
    });
    test("should return null if there is no room", async () => {
      const path = "path";
      databaseMock.query.mockResolvedValue([]);

      const result = await repository.getByPath(path);

      expect(result).toEqual(null);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM rooms WHERE path = ?",
        [path]
      );
    });
  });
  describe("insert", () => {
    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    const room = new Room(
      {
        title: "title 3",
        text: "texasdasdt",
        path: "path",
        actions: [],
        doors: [],
        extendedTexts: [],
      },
      1
    );

    beforeEach(() => {
      databaseMock.insertQuery.mockClear();
      repository.actionRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.doorRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.extendedTextRepository.getByRoomId = jest
        .fn()
        .mockResolvedValue([]);
    });
    test("should insert correctly", async () => {
      databaseMock.insertQuery.mockResolvedValue({ insertId: 1 } as OkPacket);

      await expect(repository.insert(room)).resolves.toStrictEqual({
        lastId: 1,
        success: true,
      });
      expect(databaseMock.insertQuery).toHaveBeenCalledWith(
        "INSERT INTO rooms (title,text,path) VALUES (?,?,?)",
        [room.title, room.text, room.path]
      );
    });

    test("should reject if promise is rejected", async () => {
      databaseMock.insertQuery.mockRejectedValue([]);

      await expect(repository.insert(room)).resolves.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(databaseMock.insertQuery).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO rooms (title,text,path) VALUES (?,?,?)",
        [room.title, room.text, room.path]
      );
    });
  });
  describe("update", () => {
    const room = new Room(
      {
        title: "title 3",
        text: "texasdasdt",
        path: "path",
        actions: [],
        doors: [],
        extendedTexts: [],
      },
      1
    );

    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should update correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await expect(repository.update(room)).resolves.toStrictEqual({
        success: true,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE rooms SET title = ?, text = ?, path = ? WHERE id = ?",
        [room.title, room.text, room.path, room.id]
      );
    });

    test("should reject if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.update(room)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE rooms SET title = ?, text = ?, path = ? WHERE id = ?",
        [room.title, room.text, room.path, room.id]
      );
    });
  });
  describe("delete", () => {
    const id = 1;

    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should delete correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: true,
      });

      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM rooms WHERE id = ?",
        [id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM rooms WHERE id = ?",
        [id]
      );
    });
  });
});
