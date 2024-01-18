import { mock } from "jest-mock-extended";
import DataBase from "../../src/Infra/DataBase";
import { Condition } from "../../src/Condition/Condition";
import { ConditionRepository } from "../../src/Condition/ConditionRepository";

describe("ConditionRepository", () => {
  const databaseMock = mock<DataBase>();
  const repository = new ConditionRepository(databaseMock);
  describe("getAll", () => {
    const conditions: Condition[] = [
      {
        id: 1,
        element1: "element1",
        element2: "element2",
        type: "type",
        action_id: 1,
      },
      {
        id: 2,
        element1: "element1",
        element2: "2",
        type: "type2",
        action_id: 2,
      },
    ];
    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should getAll correctly", async () => {
      databaseMock.query.mockResolvedValue(conditions);

      const result = await repository.getAll();

      expect(result).toEqual(conditions);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions"
      );
    });
    test("should reject if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getAll()).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions"
      );
    });
  });
  describe("getByActionId", () => {
    const action_id = 0;
    const conditions: Condition[] = [
      {
        id: 1,
        element1: "element1",
        element2: "element2",
        type: "type",
        action_id: 1,
      },
      {
        id: 2,
        element1: "element1",
        element2: "2",
        type: "type2",
        action_id: 2,
      },
    ];
    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should getByActionId correctly", async () => {
      databaseMock.query.mockResolvedValue(conditions);

      const result = await repository.getByActionId(action_id);

      expect(result).toEqual(conditions);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions WHERE action_id = ?",
        [action_id]
      );
    });
    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getByActionId(action_id)).rejects.toStrictEqual(
        []
      );
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions WHERE action_id = ?",
        [action_id]
      );
    });
  });
  describe("getById", () => {
    const conditions = [
      {
        id: 1,
        element1: "element1",
        element2: "element2",
        type: "type",
        action_id: 1,
      },
    ];
    const id = 1;
    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should getById correctly", async () => {
      databaseMock.query.mockResolvedValue(conditions);

      const result = await repository.getById(id);

      expect(result).toEqual(conditions[0]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions WHERE id = ?",
        [id]
      );
    });
    test("should reject if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getById(id)).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions WHERE id = ?",
        [id]
      );
    });
    test("should return null if there is no room", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue([]);

      const result = await repository.getById(id);

      expect(result).toEqual(null);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions WHERE id = ?",
        [id]
      );
    });
  });
  describe("insert", () => {
    const condition = new Condition({
      element1: "element1",
      element2: "element2",
      type: "type",
      action_id: 1,
    });
    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should insert correctly", async () => {
      databaseMock.query.mockResolvedValue([{ id: 1 }]);

      await expect(repository.insert(condition)).resolves.toStrictEqual({
        lastId: 0,
        success: true,
      });

      expect(databaseMock.query).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO conditions (element1, type, element2, action_id) VALUES (?,?,?,?)",
        [
          condition.element1,
          condition.type,
          condition.element2,
          condition.action_id,
          condition.id,
        ]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.insert(condition)).resolves.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(databaseMock.query).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO conditions (element1, type, element2, action_id) VALUES (?,?,?,?)",
        [
          condition.element1,
          condition.type,
          condition.element2,
          condition.action_id,
          condition.id,
        ]
      );
    });
  });
  describe("update", () => {
    const condition = new Condition(
      {
        element1: "element1",
        element2: "element2",
        type: "type",
        action_id: 1,
      },
      1
    );
    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should update correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await expect(repository.update(condition)).resolves.toStrictEqual({
        success: true,
      });

      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE conditions SET element1 = ?, type = ?, element2 = ?, action_id = ? WHERE id = ?",
        [
          condition.element1,
          condition.type,
          condition.element2,
          condition.action_id,
          condition.id,
        ]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.update(condition)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE conditions SET element1 = ?, type = ?, element2 = ?, action_id = ? WHERE id = ?",
        [
          condition.element1,
          condition.type,
          condition.element2,
          condition.action_id,
          condition.id,
        ]
      );
    });
  });
  describe("delete", () => {
    const id = 1;
    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should delete correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: true,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM conditions WHERE id = ?",
        [id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM conditions WHERE id = ?",
        [id]
      );
    });
  });
});
