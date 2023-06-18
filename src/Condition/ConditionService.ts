import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { Condition } from "./Condition";

export class ConditionService implements Service<Condition> {
  repository: Repository<Condition>;
  constructor(repository: Repository<Condition>) {
    this.repository = repository;
  }
  async getAll() {
    return await this.repository.getAll();
  }
  async getById(id: number) {
    return await this.repository.getById(id);
  }
  async insert(condition: Condition) {
    if (!this.validate(condition)) {
      return { success: false };
    }
    return await this.repository.insert(condition);
  }
  async update(condition: Condition) {
    if (!this.validate(condition)) {
      return { success: false };
    }
    return await this.repository.update(condition);
  }
  async delete(id: number) {
    return await this.repository.delete(id);
  }

  validate = (condition: Condition) => {
    if (
      !condition.element1 ||
      1 > condition.element1.length ||
      condition.element1.length > 30
    ) {
      return false;
    }
    if (
      !condition.element2 ||
      1 > condition.element2.length ||
      condition.element2.length > 30
    ) {
      return false;
    }
    if (
      !condition.type ||
      !["greater", "equals", "lesser"].includes(condition.type)
    ) {
      return false;
    }
    if (!condition.action_id || 0 > condition.action_id) {
      return false;
    }
    return true;
  };
}

export default ConditionService;
