import DataBase from "../Infra/DataBase";
import { Controller } from "../Interfaces/Controller";
import { Service } from "../Interfaces/Service";
import { Action } from "./Action";
import ActionRepository from "./ActionRepository";
import ActionService from "./ActionService";

export default class ActionController implements Controller<Action> {
  service: Service<Action>;
  constructor() {
    const database = new DataBase();
    const repository = new ActionRepository(database);
    this.service = new ActionService(repository);
  }

  async getAll() {
    return await this.service.getAll();
  }
  async getById(id: number) {
    return await this.service.getById(id);
  }
  async insert(action: Action) {
    return await this.service.insert(action);
  }
  async update(action: Action) {
    return await this.service.update(action);
  }
  async delete(id: number) {
    return await this.service.delete(id);
  }
}
