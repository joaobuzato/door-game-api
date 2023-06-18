import DataBase from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { Action } from "./Action";
import { ConditionRepository } from "../Condition/ConditionRepository";
export class ActionRepository implements Repository<Action> {
  dataBase: DataBase;
  conditionRepository: ConditionRepository;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
    this.conditionRepository = new ConditionRepository(dataBase);
  }

  async getAll() {
    const query = "SELECT * FROM actions";

    const result: Action[] = await this.dataBase.query<Action>(query);
    return Promise.all(
      result.map((row: Action) => {
        return this.mount(row);
      })
    );
  }
  async getById(id: number) {
    const query = `SELECT * FROM actions WHERE id = ?`;
    const result: Action[] = await this.dataBase.query<Action>(query, [id]);
    if (result.length > 0) {
      return await this.mount(result[0]);
    }
    return null;
  }
  async getByRoomId(room_id: number) {
    const query = `SELECT * FROM actions WHERE room_id = ?`;
    const result: Action[] = await this.dataBase.query<Action>(query, [
      room_id,
    ]);
    return Promise.all(
      result.map((row: Action) => {
        return this.mount(row);
      })
    );
  }
  async insert(action: Action) {
    const query = `INSERT INTO actions (type,button_text,element,qtd,room_id) VALUES (?,?,?,?,?)`;
    return this.dataBase
      .query<Action>(query, [
        action.type,
        action.button_text,
        action.element,
        action.qtd,
        action.room_id,
      ])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async update(action: Action) {
    const query = `UPDATE actions SET type = ?, button_text = ?, element = ?, qtd = ?, room_id = ? WHERE id = ?`;
    return this.dataBase
      .query<Action>(query, [
        action.type,
        action.button_text,
        action.element,
        action.qtd,
        action.room_id,
        action.id || 0,
      ])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async delete(id: number) {
    const query = `DELETE FROM actions WHERE id = ?`;
    return this.dataBase
      .query<Action>(query, [id])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }

  async mount(row: Action) {
    const action = new Action(row, row.id);
    action.conditions = await this.conditionRepository.getByActionId(action.id);
    return action;
  }
}

export default ActionRepository;
