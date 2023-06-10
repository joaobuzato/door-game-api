import DataBase from "../Infra/DataBase";
import { Controller } from "../Interfaces/Controller";
import { Service } from "../Interfaces/Service";
import { Door } from "./Door";
import DoorRepository from "./DoorRepository";
import DoorService from "./DoorService";

export default class DoorController implements Controller<Door> {
  service: Service<Door>;
  constructor() {
    const database = new DataBase();
    const repository = new DoorRepository(database);
    this.service = new DoorService(repository);
  }

  async getAll() {
    return await this.service.getAll();
  }
  async getById(id: number) {
    return await this.service.getById(id);
  }
  async insert(door: Door) {
    return await this.service.insert(door);
  }
  async update(door: Door) {
    return await this.service.update(door);
  }
  async delete(id: number) {
    return await this.service.delete(id);
  }
}
