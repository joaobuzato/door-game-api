import DataBase from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { Action } from "./Action";
export class ActionRepository implements Repository<Action> {
  dataBase: DataBase;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
  }

  async getAll() {
    const query = "SELECT * FROM actions";
    const items: Action[] = [];
    const result: Action[] = await this.dataBase.query<Action>(query);
    result.forEach((row: Action) => {
      const action = this.mount(row);
      items.push(action);
    });
    return items;
  }
  async getById(id: number) {
    const query = `SELECT * FROM actions WHERE id = ?`;
    const result: Action[] = await this.dataBase.query<Action>(query, [id]);
    if (result.length > 0) {
      return this.mount(result[0]);
    }
    return null;
  }
  async insert(action: Action) {
    const query = `INSERT INTO actions (type,button_text,element,qtd,room_id) VALUES (?,?,?,?,?)`;
    await this.dataBase.query<Action>(query, [
      action.type,
      action.button_text,
      action.element,
      action.qtd,
      action.room_id,
    ]);
  }
  async update(action: Action) {
    const query = `UPDATE actions SET type = ?, button_text = ?, element = ?, qtd = ?, room_id = ? WHERE id = ?`;
    await this.dataBase.query<Action>(query, [
      action.type,
      action.button_text,
      action.element,
      action.qtd,
      action.room_id,
      action.id || 0,
    ]);
  }
  async delete(id: number) {
    const query = `DELETE FROM actions WHERE id = ?`;
    await this.dataBase.query<Action>(query, [id]);
  }

  mount(row: Action) {
    return new Action(row, row.id);
  }
}

export default ActionRepository;
