import { describe, expect, test } from "@jest/globals";
import { Room } from "../../src/Room/Room";

import { RoomRepository } from "../../src/Room/RoomRepository";
import DataBase from "../../src/Infra/DataBase";
import { mock } from "jest-mock-extended";

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
      {
        id: 3,
        title: "title 3",
        text: "texasdasdt",
        path: "path",
        actions: [],
        doors: [],
        rooms: [],
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      repository.actionRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.doorRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.roomRepository.getByRoomId = jest.fn().mockResolvedValue([]);
    });
    test("should getAll correctly", async () => {
      databaseMock.query.mockResolvedValue(rooms);

      const result = await repository.getAll();

      expect(result).toEqual(rooms);
      expect(databaseMock.query).toHaveBeenCalledWith("SELECT * FROM rooms");
    });
    test("should throw if promise is rejected", async () => {
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));

      await expect(repository.getAll()).rejects.toThrow(errorMessage);
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
        rooms: [],
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new RoomRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      repository.actionRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.doorRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.roomRepository.getByRoomId = jest.fn().mockResolvedValue([]);
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
    test("should throw if promise is rejected", async () => {
      const id = 1;
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));

      await expect(repository.getById(id)).rejects.toThrow(errorMessage);
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
        rooms: [],
      },
      1
    );

    beforeEach(() => {
      databaseMock.query.mockClear();
      repository.actionRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.doorRepository.getByRoomId = jest.fn().mockResolvedValue([]);
      repository.roomRepository.getByRoomId = jest.fn().mockResolvedValue([]);
    });
    test("should insert correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await repository.insert(room);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "INSERT INTO rooms (title,text,path) VALUES (?,?,?)",
        [room.title, room.text, room.path]
      );
    });

    test("should throw if promise is rejected", async () => {
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));

      await expect(repository.insert(room)).rejects.toThrow(errorMessage);
      expect(databaseMock.query).toHaveBeenCalledWith(
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
        rooms: [],
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

      await repository.update(room);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE rooms SET title = ?, text = ?, path = ? WHERE id = ?",
        [room.title, room.text, room.path, room.id]
      );
    });

    test("should throw if promise is rejected", async () => {
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));
      const room = new Room(
        {
          title: "title 3",
          text: "texasdasdt",
          path: "path",
          actions: [],
          doors: [],
          rooms: [],
        },
        1
      );

      await expect(repository.update(room)).rejects.toThrow(errorMessage);
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

      await repository.delete(id);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM rooms WHERE id = ?",
        [id]
      );
    });

    test("should throw if promise is rejected", async () => {
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));

      await expect(repository.delete(id)).rejects.toThrow(errorMessage);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM rooms WHERE id = ?",
        [id]
      );
    });
  });
});
