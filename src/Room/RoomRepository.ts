import ActionRepository from "../Action/ActionRepository";
import DoorRepository from "../Door/DoorRepository";
import ExtendedTextRepository from "../ExtendedText/ExtendedTextRepository";
import DataBase from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { Room } from "./Room";
export class RoomRepository implements Repository<Room> {
  dataBase: DataBase;
  actionRepository: ActionRepository;
  extendedTextRepository: ExtendedTextRepository;
  doorRepository: DoorRepository;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
    this.actionRepository = new ActionRepository(dataBase);
    this.extendedTextRepository = new ExtendedTextRepository(dataBase);
    this.doorRepository = new DoorRepository(dataBase);
  }

  async getAll() {
    const query = "SELECT * FROM rooms";
    return this.dataBase.query<Room>(query).then((result) => {
      return Promise.all(
        result.map((row: Room) => {
          return this.mount(row);
        })
      );
    });
  }
  async getById(id: number) {
    const query = `SELECT * FROM rooms WHERE id = ?`;
    const result = await this.dataBase.query<Room>(query, [id]);
    return result.length === 0 ? null : this.mount(result[0]);
  }
  async getByPath(path: string) {
    const query = `SELECT * FROM rooms WHERE path = ?`;
    const result = await this.dataBase.query<Room>(query, [path]);
    return result.length === 0 ? null : this.mount(result[0]);
  }
  async insert(room: Room) {
    const query = `INSERT INTO rooms (title,text,path) VALUES (?,?,?)`;
    return this.dataBase
      .query<Room>(query, [room.title, room.text, room.path])
      .then(() => {
        return this.dataBase
          .query<{ id: number }>(
            "SELECT id FROM rooms ORDER BY id DESC LIMIT 1"
          )
          .then((lastId) => {
            return { lastId: lastId[0].id, success: true };
          });
      })
      .catch((e) => {
        console.log("catch", e);
        return { lastId: 0, success: false };
      });
  }
  async update(room: Room) {
    const query = `UPDATE rooms SET title = ?, text = ?, path = ? WHERE id = ?`;
    return this.dataBase
      .query<Room>(query, [room.title, room.text, room.path, room.id])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async delete(id: number) {
    const query = `DELETE FROM rooms WHERE id = ?`;
    return this.dataBase
      .query<Room>(query, [id])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }

  async mount(row: Room) {
    const room = new Room(row, row.id);
    room.actions = await this.actionRepository.getByRoomId(room.id);
    room.extendedTexts = await this.extendedTextRepository.getByRoomId(room.id);
    room.doors = await this.doorRepository.getByRoomId(room.id);
    return room;
  }
}

export default RoomRepository;
