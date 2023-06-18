import DataBase from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { Condition } from "./Condition";
export class ConditionRepository implements Repository<Condition> {
  dataBase: DataBase;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
  }

  async getAll() {
    const query = "SELECT * FROM conditions";
    return await this.dataBase.query<Condition>(query);
  }

  async getByActionId(action_id: number) {
    const query = "SELECT * FROM conditions WHERE action_id = ?";
    return await this.dataBase.query<Condition>(query, [action_id]);
  }

  async getById(id: number) {
    const query = "SELECT * FROM conditions WHERE id = ?";
    const result = await this.dataBase.query<Condition>(query, [id]);
    return result.length > 0 ? result[0] : null;
  }
  async insert(condition: Condition) {
    const query =
      "INSERT INTO conditions (element1, type, element2, action_id) VALUES (?,?,?,?)";
    return this.dataBase
      .query<Condition>(query, [
        condition.element1,
        condition.type,
        condition.element2,
        condition.action_id,
        condition.id,
      ])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async update(condition: Condition) {
    const query =
      "UPDATE conditions SET element1 = ?, type = ?, element2 = ?, action_id = ? WHERE id = ?";
    return this.dataBase
      .query<Condition>(query, [
        condition.element1,
        condition.type,
        condition.element2,
        condition.action_id,
        condition.id,
      ])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async delete(id: number) {
    const query = "DELETE FROM conditions WHERE id = ?";
    return this.dataBase
      .query(query, [id])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }

  mount(condition: Condition) {
    return new Condition(condition, condition.id);
  }
}
