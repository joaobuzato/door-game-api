import ActionRepository from "../Action/ActionRepository";
import DoorRepository from "../Door/DoorRepository";
import ExtendedTextRepository from "../ExtendedText/ExtendedTextRepository";
import DataBase from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { Room } from "./Room";
export class RoomRepository implements Repository<Room> {
  dataBase: DataBase;
  actionRepository: ActionRepository;
  roomRepository: ExtendedTextRepository;
  doorRepository: DoorRepository;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
    this.actionRepository = new ActionRepository(dataBase);
    this.roomRepository = new ExtendedTextRepository(dataBase);
    this.doorRepository = new DoorRepository(dataBase);
  }

  async getAll() {
    const query = "SELECT * FROM rooms";
    const result: Room[] = await this.dataBase.query<Room>(query);
    return Promise.all(
      result.map((row: Room) => {
        return this.mount(row);
      })
    );
  }
  async getById(id: number) {
    const query = `SELECT * FROM rooms WHERE id = ?`;
    const result: Room[] = await this.dataBase.query<Room>(query, [id]);
    if (result.length > 0) {
      return this.mount(result[0]);
    }
    return null;
  }
  async insert(room: Room) {
    const query = `INSERT INTO rooms (title,text,path) VALUES (?,?,?)`;
    await this.dataBase.query<Room>(query, [room.title, room.text, room.path]);
  }
  async update(room: Room) {
    const query = `UPDATE rooms SET title = ?, text = ?, path = ? WHERE id = ?`;
    await this.dataBase.query<Room>(query, [
      room.title,
      room.text,
      room.path,
      room.id,
    ]);
  }
  async delete(id: number) {
    const query = `DELETE FROM rooms WHERE id = ?`;
    await this.dataBase.query<Room>(query, [id]);
  }

  async mount(row: Room) {
    const room = new Room(row, row.id);
    room.actions = await this.actionRepository.getByRoomId(room.id);
    room.rooms = await this.roomRepository.getByRoomId(room.id);
    room.doors = await this.doorRepository.getByRoomId(room.id);
    return room;
  }
}

export default RoomRepository;
