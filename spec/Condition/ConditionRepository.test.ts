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
    test("should get All correctly", async () => {
      databaseMock.query.mockResolvedValue(conditions);

      const result = await repository.getAll();

      expect(result).toEqual(conditions);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions"
      );
    });
    test("should throw if promise is rejected", async () => {
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));

      await expect(repository.getAll()).rejects.toThrow(errorMessage);
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
      const errorMessage = "Database query error";
      databaseMock.query.mockRejectedValue(new Error(errorMessage));

      await expect(repository.getByActionId(action_id)).rejects.toThrow(
        errorMessage
      );
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM conditions WHERE action_id = ?",
        [action_id]
      );
    });
  });
});
