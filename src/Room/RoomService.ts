import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { Room } from "./Room";

export class RoomService implements Service<Room> {
  repository: Repository<Room>;
  constructor(repository: Repository<Room>) {
    this.repository = repository;
  }
  async getAll() {
    return await this.repository.getAll();
  }
  async getById(id: number) {
    return await this.repository.getById(id);
  }
  async insert(room: Room) {
    if (!this.validate(room)) {
      return { success: false };
    }
    return await this.repository.insert(room);
  }
  async update(room: Room) {
    if (!this.validate(room)) {
      return { success: false };
    }
    return await this.repository.update(room);
  }
  async delete(id: number) {
    return await this.repository.delete(id);
  }

  validate = (room: Room) => {
    if (!room.path || 1 > room.path.length || room.path.length > 12)
      return false;
    if (!room.title || 1 > room.title.length || room.title.length > 140)
      return false;
    if (!room.text || 1 > room.text.length || room.text.length > 1000)
      return false;
    return true;
  };
}

export default RoomService;
