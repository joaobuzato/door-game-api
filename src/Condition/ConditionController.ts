import DataBase from "../Infra/DataBase";
import { Controller } from "../Interfaces/Controller";
import { Service } from "../Interfaces/Service";
import { Condition } from "./Condition";
import { ConditionRepository } from "./ConditionRepository";
import ConditionService from "./ConditionService";

export default class ConditionController implements Controller<Condition> {
  service: Service<Condition>;
  constructor() {
    const database = new DataBase();
    const repository = new ConditionRepository(database);
    this.service = new ConditionService(repository);
  }

  async getAll() {
    return await this.service.getAll();
  }
  async getById(id: number) {
    return await this.service.getById(id);
  }
  async insert(condition: Condition) {
    return await this.service.insert(condition);
  }
  async update(condition: Condition) {
    return await this.service.update(condition);
  }
  async delete(id: number) {
    return await this.service.delete(id);
  }
}
