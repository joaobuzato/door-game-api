import { describe, expect, test } from "@jest/globals";
import { Action } from "../../src/Action/Action";

import { ActionRepository } from "../../src/Action/ActionRepository";
import DataBase from "../../src/Infra/DataBase";
import { mock } from "jest-mock-extended";

describe("ActionRepository", () => {
  describe("getAll", () => {
    const actions: Action[] = [
      {
        id: 1,
        type: "typeTest",
        button_text: "button_text",
        element: "element",
        qtd: 4,
        room_id: 1,
        conditions: [],
      },
      {
        id: 2,
        type: "typeTest",
        button_text: "button_text",
        element: "element 2 ",
        qtd: 8,
        room_id: 1,
        conditions: [],
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new ActionRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      repository.conditionRepository.getByActionId = jest
        .fn()
        .mockResolvedValue([]);
    });
    test("should getAll correctly", async () => {
      databaseMock.query.mockResolvedValue(actions);

      const result = await repository.getAll();

      expect(result).toEqual(actions);
      expect(databaseMock.query).toHaveBeenCalledWith("SELECT * FROM actions");
    });
    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getAll()).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith("SELECT * FROM actions");
    });
  });
  describe("getById", () => {
    const actions: Action[] = [
      {
        id: 1,
        type: "typeTest",
        button_text: "button_text",
        element: "element",
        qtd: 4,
        room_id: 1,
        conditions: [],
      },
    ];

    const databaseMock = mock<DataBase>();
    const repository = new ActionRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      repository.conditionRepository.getByActionId = jest
        .fn()
        .mockResolvedValue([]);
    });
    test("should getById correctly", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue(actions);

      const result = await repository.getById(id);

      expect(result).toEqual(actions[0]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM actions WHERE id = ?",
        [id]
      );
    });
    test("should throw if promise is rejected", async () => {
      const id = 1;
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getById(id)).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM actions WHERE id = ?",
        [id]
      );
    });
    test("should return null if there is no door", async () => {
      const id = 1;
      databaseMock.query.mockResolvedValue([]);

      const result = await repository.getById(id);

      expect(result).toEqual(null);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM actions WHERE id = ?",
        [id]
      );
    });
  });
  describe("insert", () => {
    const databaseMock = mock<DataBase>();
    const repository = new ActionRepository(databaseMock);

    const action = new Action(
      {
        type: "typeTest",
        button_text: "button_text",
        element: "element",
        qtd: 4,
        room_id: 1,
      },
      1
    );

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should insert correctly", async () => {
      databaseMock.query.mockResolvedValue([{ id: 1 }]);

      await repository.insert(action);

      expect(databaseMock.query).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO actions (type,button_text,element,qtd,room_id) VALUES (?,?,?,?,?)",
        [
          action.type,
          action.button_text,
          action.element,
          action.qtd,
          action.room_id,
        ]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.insert(action)).resolves.toStrictEqual({
        lastId: 0,
        success: false,
      });
      expect(databaseMock.query).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO actions (type,button_text,element,qtd,room_id) VALUES (?,?,?,?,?)",
        [
          action.type,
          action.button_text,
          action.element,
          action.qtd,
          action.room_id,
        ]
      );
    });
  });
  describe("update", () => {
    const action = new Action(
      {
        type: "typeTest",
        button_text: "button_text",
        element: "element",
        qtd: 4,
        room_id: 1,
      },
      1
    );

    const databaseMock = mock<DataBase>();
    const repository = new ActionRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should update correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await repository.update(action);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE actions SET type = ?, button_text = ?, element = ?, qtd = ?, room_id = ? WHERE id = ?",
        [
          action.type,
          action.button_text,
          action.element,
          action.qtd,
          action.room_id,
          action.id,
        ]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.update(action)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "UPDATE actions SET type = ?, button_text = ?, element = ?, qtd = ?, room_id = ? WHERE id = ?",
        [
          action.type,
          action.button_text,
          action.element,
          action.qtd,
          action.room_id,
          action.id,
        ]
      );
    });
  });
  describe("delete", () => {
    const id = 1;

    const databaseMock = mock<DataBase>();
    const repository = new ActionRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
    });
    test("should delete correctly", async () => {
      databaseMock.query.mockResolvedValue([]);

      await repository.delete(id);

      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM actions WHERE id = ?",
        [id]
      );
    });

    test("should throw if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.delete(id)).resolves.toStrictEqual({
        success: false,
      });
      expect(databaseMock.query).toHaveBeenCalledWith(
        "DELETE FROM actions WHERE id = ?",
        [id]
      );
    });
  });
});
