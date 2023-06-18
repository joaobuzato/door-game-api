import DataBase from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { ExtendedText } from "./ExtendedText";
export class ExtendedTextRepository implements Repository<ExtendedText> {
  dataBase: DataBase;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
  }

  async getAll() {
    const query = "SELECT * FROM extended_texts";
    const items: ExtendedText[] = [];
    const result: ExtendedText[] = await this.dataBase.query<ExtendedText>(
      query
    );
    result.forEach((row: ExtendedText) => {
      const extendedText = this.mount(row);
      items.push(extendedText);
    });
    return items;
  }
  async getById(id: number) {
    const query = `SELECT * FROM extended_texts WHERE id = ?`;
    const result: ExtendedText[] = await this.dataBase.query<ExtendedText>(
      query,
      [id]
    );
    if (result.length > 0) {
      return this.mount(result[0]);
    }
    return null;
  }
  async getByRoomId(room_id: number) {
    const query = `SELECT * FROM extended_texts WHERE room_id = ?`;
    const items: ExtendedText[] = [];
    const result: ExtendedText[] = await this.dataBase.query<ExtendedText>(
      query,
      [room_id]
    );
    result.forEach((row: ExtendedText) => {
      const ExtendedText = this.mount(row);
      items.push(ExtendedText);
    });
    return items;
  }
  async insert(extendedText: ExtendedText) {
    const query = `INSERT INTO extended_texts (sentence, text, room_id) VALUES (?,?,?)`;
    return this.dataBase
      .query<ExtendedText>(query, [
        extendedText.sentence,
        extendedText.text,
        extendedText.room_id,
      ])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async update(extendedText: ExtendedText) {
    const query = `UPDATE extended_texts SET sentence = ?, text = ?, room_id = ? WHERE id = ?`;
    return this.dataBase
      .query<ExtendedText>(query, [
        extendedText.sentence,
        extendedText.text,
        extendedText.room_id,
        extendedText.id,
      ])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }
  async delete(id: number) {
    const query = `DELETE FROM extended_texts WHERE id = ?`;
    return this.dataBase
      .query<ExtendedText>(query, [id])
      .then(() => {
        return { success: true };
      })
      .catch(() => {
        return { success: false };
      });
  }

  mount(row: ExtendedText) {
    return new ExtendedText(row, row.id);
  }
}

export default ExtendedTextRepository;
