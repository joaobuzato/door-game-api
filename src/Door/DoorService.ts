import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { Door } from "./Door";

export class DoorService implements Service<Door> {
  repository: Repository<Door>;
  constructor(repository: Repository<Door>) {
    this.repository = repository;
  }
  async getAll(filters?: { roomId?: string }) {
    return await this.repository.getAll(filters);
  }
  async getById(id: number) {
    const item = await this.repository.getById(id);
    return item;
  }
  async insert(door: Door) {
    if (!this.validate(door)) {
      return { success: false };
    }
    return await this.repository.insert(door);
  }
  async update(door: Door) {
    if (!this.validate(door)) {
      return { success: false };
    }
    return await this.repository.update(door);
  }
  async delete(id: number) {
    return await this.repository.delete(id);
  }

  validate = (door: Door) => {
    if (!door.path || 1 > door.path.length || door.path.length > 30)
      return false;
    if (!door.color || door.color.length !== 7 || !door.color.startsWith("#"))
      return false;
    if (!door.room_id || door.room_id < 1) return false;
    return true;
  };
}

export default DoorService;
