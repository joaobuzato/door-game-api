import DataBase from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { Door } from "./Door";
export class DoorRepository implements Repository<Door> {
  dataBase: DataBase;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
  }

  async getAll(filters?: { roomId?: string }) {
    const filtersString = filters?.roomId
      ? ` AND d.room_id = ${filters.roomId}`
      : "";
    const query = `SELECT * FROM doors d WHERE 1 ${filtersString}`;
    const items: Door[] = [];
    const result: Door[] = await this.dataBase.query<Door>(query);
    result.forEach((row: Door) => {
      const door = this.mount(row);
      items.push(door);
    });
    return items;
  }
  async getById(id: number) {
    const query = `SELECT * FROM doors WHERE id = ?`;
    const result: Door[] = await this.dataBase.query<Door>(query, [id]);
    if (result.length > 0) {
      return this.mount(result[0]);
    }
    return null;
  }
  async getByRoomId(room_id: number) {
    const query = `SELECT * FROM doors WHERE room_id = ?`;
    const items: Door[] = [];
    const result: Door[] = await this.dataBase.query<Door>(query, [room_id]);
    result.forEach((row: Door) => {
      const door = this.mount(row);
      items.push(door);
    });
    return items;
  }
  async insert(door: Door) {
    const query = `INSERT INTO doors (path, text, color, room_id) VALUES (?,?,?,?)`;
    return this.dataBase
      .query<Door>(query, [door.path, door.text, door.color, door.room_id])
      .then(() => {
        return { lastId: 0, success: true };
      })
      .catch(() => {
        return { lastId: 0, success: false };
      });
  }
  async update(door: Door) {
    const query = `UPDATE doors SET path = ?, text = ?, color = ?, room_id = ? WHERE id = ?`;
    return this.dataBase
      .query<Door>(query, [
        door.path,
        door.text,
        door.color,
        door.room_id,
        door.id,
      ])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async delete(id: number) {
    const query = `DELETE FROM doors WHERE id = ?`;
    return this.dataBase
      .query<Door>(query, [id])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }

  mount(row: Door) {
    return new Door(row, row.id);
  }
}

export default DoorRepository;
