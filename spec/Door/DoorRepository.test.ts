import { describe, expect, test } from "@jest/globals";
import { Door } from "../../src/Door/Door";

import { DoorRepository } from "../../src/Door/DoorRepository";
import DataBase from "../../src/Infra/DataBase";
import { mock } from "jest-mock-extended";

describe("DoorRepository", () => {
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
      {
        id: 1,
        path: "patfh",
        color: "#000fd0",
        room_id: 2,
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new DoorRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should getAll correctly", async () => {
      databaseMock.query.mockResolvedValue(doors);

      const result = await repository.getAll();

      expect(result).toEqual(doors);
      expect(databaseMock.query).toHaveBeenCalledWith("SELECT * FROM doors");
    });
    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getAll()).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith("SELECT * FROM doors");
    });
  });
  describe("getById", () => {
    const doors: Door[] = [
      {
        id: 1,
        path: "patfh",
        color: "#000fd0",
        room_id: 2,
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new DoorRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should getById correctly", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue(doors);

      const result = await repository.getById(id);

      expect(result).toEqual(doors[0]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM doors WHERE id = ?",
        [id]
      );
    });
    test("should throw if promise is rejected", async () => {
      const id = 1;
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getById(id)).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM doors WHERE id = ?",
        [id]
      );
    });
    test("should return null if there is no door", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue([]);

      const result = await repository.getById(id);

      expect(result).toEqual(null);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM doors WHERE id = ?",
        [id]
      );
    });
  });
  describe("insert", () => {
    const databaseMock = mock<DataBase>();
    const repository = new DoorRepository(databaseMock);

    const door = new Door(
      {
        path: "patfh",
        color: "#000fd0",
        room_id: 2,
      },
      1
    );

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should insert correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await repository.insert(door);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "INSERT INTO doors (path, color, room_id) VALUES (?,?,?)",
        [door.path, door.color, door.room_id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.insert(door)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "INSERT INTO doors (path, color, room_id) VALUES (?,?,?)",
        [door.path, door.color, door.room_id]
      );
    });
  });
  describe("update", () => {
    const door = new Door(
      {
        path: "patfh",
        color: "#000fd0",
        room_id: 2,
      },
      1
    );

    const databaseMock = mock<DataBase>();
    const repository = new DoorRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should update correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await repository.update(door);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE doors SET path = ?, color = ?, room_id = ? WHERE id = ?",
        [door.path, door.color, door.room_id, door.id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.update(door)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE doors SET path = ?, color = ?, room_id = ? WHERE id = ?",
        [door.path, door.color, door.room_id, door.id]
      );
    });
  });
  describe("delete", () => {
    const id = 1;

    const databaseMock = mock<DataBase>();
    const repository = new DoorRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should delete correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await repository.delete(id);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM doors WHERE id = ?",
        [id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM doors WHERE id = ?",
        [id]
      );
    });
  });
});
