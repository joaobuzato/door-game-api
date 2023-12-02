import DataBase from "../Infra/DataBase";
import { Controller } from "../Interfaces/Controller";
import { Room } from "./Room";
import RoomRepository from "./RoomRepository";
import RoomService from "./RoomService";

export default class RoomController implements Controller<Room> {
  service: RoomService;
  constructor() {
    const database = new DataBase();
    const repository = new RoomRepository(database);
    this.service = new RoomService(repository);
  }

  async getAll() {
    return await this.service.getAll();
  }
  async getById(id: number) {
    return await this.service.getById(id);
  }
  async getByPath(path: string) {
    return await this.service.getByPath(path);
  }
  async insert(room: Room) {
    return await this.service.insert(room);
  }
  async update(room: Room) {
    return await this.service.update(room);
  }
  async delete(id: number) {
    return await this.service.delete(id);
  }
}
