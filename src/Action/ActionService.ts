import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { Action } from "./Action";

export class ActionService implements Service<Action> {
  repository: Repository<Action>;
  constructor(repository: Repository<Action>) {
    this.repository = repository;
  }
  async getAll() {
    return await this.repository.getAll();
  }
  async getById(id: number) {
    return await this.repository.getById(id);
  }
  async insert(action: Action) {
    if (!this.validate(action)) {
      return { success: false };
    }
    return await this.repository.insert(action);
  }
  async update(action: Action) {
    if (!this.validate(action)) {
      return { success: false };
    }
    return await this.repository.update(action);
  }
  async delete(id: number) {
    return this.repository.delete(id);
  }

  validate = (action: Action) => {
    let valid = true;

    if (!action.type || !["get", "use"].includes(action.type)) {
      valid = false;
    }
    if (
      !action.button_text ||
      1 > action.button_text.length ||
      action.button_text.length >= 140
    ) {
      valid = false;
    }
    if (
      !action.element ||
      1 > action.element.length ||
      action.element.length >= 140
    ) {
      valid = false;
    }
    if (!action.qtd || action.qtd < 1) {
      valid = false;
    }
    if (!action.room_id || action.room_id < 1) {
      valid = false;
    }
    return valid;
  };
}

export default ActionService;
