import { Connection } from "mysql";
import { connection } from "../Infra/connection";
import { Repository } from "../Interfaces/Repository";
import { ExtendedText } from "./ExtendedText";
export class extendedTextRepository implements Repository {
  con: Connection;
  constructor() {
    this.con = connection.connect();
  }

  getAll = async () => {
    try {
      const query = "SELECT * FROM extended_texts";
      const items: ExtendedText[] = [];
      const result: ExtendedText[] = await new Promise((resolve, reject) => {
        this.con.query(query, (err, result) => {
          if (err) {
            console.log(err);
            reject([]);
          }
          resolve(result);
        });
      });
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
      const result: ExtendedText[] = await new Promise((resolve, reject) => {
        this.con.query(query, [id], (err, result) => {
          if (err) {
            console.log(err);
            reject({});
          }
          resolve(result);
        });
      });
      if (result.length > 0) {
        return this.mount(result[0]);
      }
      return {};
    } catch (e) {
      throw e;
    }
  };
  insert = async (extendedText: ExtendedText) => {
    try {
      const query = `INSERT INTO extended_texts (sentence, text, room_id) VALUES (?,?,?)`;
      await new Promise((resolve, reject) => {
        this.con.query(
          query,
          [extendedText.sentence, extendedText.text, extendedText.room_id],
          (err, result) => {
            if (err) {
              console.log(err);
              reject();
            }
            resolve(result);
          }
        );
      });
    } catch (e) {
      throw e;
    }
  };
  mount(row: ExtendedText) {
    return new ExtendedText(row, row.id);
  }
}

export default extendedTextRepository;
