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
    const item = await this.repository.getById(id);
    return item;
  }
  async insert(action: Action) {
    if (!this.validate(action)) {
      throw new Error("action Inválido");
    }
    await this.repository.insert(action);
  }
  async update(action: Action) {
    if (!this.validate(action)) {
      throw new Error("action Inválido");
    }
    await this.repository.update(action);
  }
  async delete(id: number) {
    this.repository.delete(id);
  }

  validate = (action: Action) => {
    let valid = true;
    if (!["get", "use"].includes(action.type)) {
      valid = false;
    }
    if (1 > action.button_text.length || action.button_text.length >= 140) {
      valid = false;
    }
    if (1 > action.element.length || action.element.length >= 140) {
      valid = false;
    }
    if (action.qtd < 1) {
      valid = false;
    }
    if (action.room_id < 1) {
      valid = false;
    }
    return valid;
  };
}

export default ActionService;
