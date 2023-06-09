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
    const items: Condition[] = [];
    const result: Condition[] = await this.dataBase.query<Condition>(query);
    result.forEach((row: Condition) => {
      const condition = this.mount(row);
      items.push(condition);
    });
    return items;
  }

  async getByActionId(action_id: number) {
    const query = "SELECT * FROM conditions WHERE action_id = ?";
    return await this.dataBase.query<Condition>(query, [action_id]);
  }

  async getById(id: number) {
    console.log("getById");
    return null;
  }
  async insert(condition: Condition) {
    console.log("insert");
  }
  async update(condition: Condition) {
    console.log("update");
  }
  async delete(id: number) {
    console.log("delete");
  }

  mount(condition: Condition) {
    return new Condition(condition, condition.id);
  }
}
