import { describe, expect, test } from "@jest/globals";
import { Door } from "../../src/Door/Door";

import { DoorRepository } from "../../src/Door/DoorRepository";
import { DoorService } from "../../src/Door/DoorService";
import { mock } from "jest-mock-extended";

describe("doorService", () => {
  const repositoryMock = mock<DoorRepository>();
  const service = new DoorService(repositoryMock);
  describe("validate", () => {
    const bigPath = "a".repeat(31);

    test.each([
      { id: 0, path: "", color: "", room_id: 0 },
      { id: 0, path: "abcde", color: "abcabc", room_id: 0 },
      { id: 0, path: "", color: "igfdsahfdgsaf", room_id: 1 },
      { id: 0, path: "adsffdas", color: "", room_id: 1 },
      { id: 0, path: "dsadsadas", color: "#color1", room_id: 0 },
      { id: 0, path: "", color: "#color3", room_id: 1 },
      { id: 0, path: "", color: "", room_id: 0 },
      { id: 0, path: bigPath, color: "#color1", room_id: 1 },
      { id: 0, path: "path", color: "olor1", room_id: 1 },
    ])("should return invalid if door is not valid", (door) => {
      const isValid = service.validate(door);
      expect(isValid).toBe(false);
    });
  });

  describe("getAll", () => {
    const doors: Door[] = [
      {
        id: 1,
        path: "path",
        color: "#color1",
        room_id: 1,
      },
      {
        id: 2,
        path: "path 2",
        color: "#color1",
        room_id: 1,
      },
    ];
    beforeEach(() => {
      repositoryMock.getAll.mockClear();
    });
    test("should getAll Correctly", async () => {
      repositoryMock.getAll.mockResolvedValue(doors);

      const result = await service.getAll();

      expect(result).toEqual(doors);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.getAll.mockRejectedValue([]);

      await expect(service.getAll()).rejects.toStrictEqual([]);
      expect(repositoryMock.getAll).toBeCalledTimes(1);
    });
  });
  describe("getById", () => {
    const door: Door = {
      id: 1,
      path: "path",
      color: "#color1",
      room_id: 1,
    };
    beforeEach(() => {
      repositoryMock.getById.mockClear();
    });
    test("should getById Correctly", async () => {
      const id = 1;
      repositoryMock.getById.mockResolvedValue(door);

      const result = await service.getById(id);

      expect(result).toEqual(door);
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
    const door: Door = new Door(
      {
        path: "path",
        color: "#color1",
        room_id: 1,
      },
      1
    );
    beforeEach(() => {
      repositoryMock.insert.mockClear();
    });
    test("should insert Correctly", async () => {
      repositoryMock.insert.mockResolvedValue({ success: false });

      await service.insert(door);

      expect(repositoryMock.insert).toBeCalledWith(door);
    });
    test("should throw error if color is not valid", async () => {
      const doorTest = { ...door, color: "" };
      await expect(service.insert(doorTest)).resolves.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.insert.mockRejectedValue({ success: false });

      await expect(service.insert(door)).rejects.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.insert).toBeCalledWith(door);
    });
  });
  describe("update", () => {
    const door: Door = {
      id: 1,
      path: "path",
      color: "#color1",
      room_id: 1,
    };
    beforeEach(() => {
      repositoryMock.update.mockClear();
    });
    test("should update Correctly", async () => {
      repositoryMock.update.mockResolvedValue({ success: true });

      await service.update(door);

      expect(repositoryMock.update).toBeCalledWith(door);
    });
    test("should throw error if color is not valid", async () => {
      const doorTest = { ...door, color: "" };
      await expect(service.update(doorTest)).resolves.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledTimes(0);
    });
    test("should propagate error if there is a throw in repository", async () => {
      repositoryMock.update.mockRejectedValue({ success: false });

      await expect(service.update(door)).rejects.toStrictEqual({
        success: false,
      });
      expect(repositoryMock.update).toBeCalledWith(door);
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
