import { Connection } from "mysql";
import { DataBase } from "../Infra/DataBase";
import { Repository } from "../Interfaces/Repository";
import { ExtendedText } from "./ExtendedText";
export class ExtendedTextRepository implements Repository<ExtendedText> {
  dataBase: DataBase;
  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
  }

  getAll = async () => {
    try {
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
    } catch (e) {
      throw e;
    }
  };
  getById = async (id: number) => {
    try {
      const query = `SELECT * FROM extended_texts WHERE id = ?`;
      const result: ExtendedText[] = await this.dataBase.query<ExtendedText>(
        query,
        [id]
      );
      if (result.length > 0) {
        return this.mount(result[0]);
      }
      return null;
    } catch (e) {
      throw e;
    }
  };
  insert = async (extendedText: ExtendedText) => {
    try {
      const query = `INSERT INTO extended_texts (sentence, text, room_id) VALUES (?,?,?)`;
      await this.dataBase.query<ExtendedText>(query, [
        extendedText.sentence,
        extendedText.text,
        extendedText.room_id,
      ]);
    } catch (e) {
      throw e;
    }
  };
  update = async (extendedText: ExtendedText) => {
    try {
      const query = `UPDATE extended_texts SET sentence = ?, text = ?, room_id = ? WHERE id = ?`;
      await this.dataBase.query<ExtendedText>(query, [
        extendedText.sentence,
        extendedText.text,
        extendedText.room_id,
      ]);
    } catch (e) {
      throw e;
    }
  };
  delete = async (id: number) => {
    try {
      const query = `DELETE FROM extended_texts WHERE id = ?`;
      await await this.dataBase.query<ExtendedText>(query, [id]);
    } catch (e) {
      throw e;
    }
  };

  mount(row: ExtendedText) {
    return new ExtendedText(row, row.id);
  }
}

export default ExtendedTextRepository;
