import { dataBase } from "../Infra/dataBase";
import { Repository } from "../Interfaces/Repository";
import { ExtendedText } from "./ExtendedText";
const db = new dataBase();
export class extendedTextRepository implements Repository {
  constructor() {}

  getAll = async () => {
    const connection = await db.getConnection();
    const sql = "SELECT * FROM extended_texts";
    const items: ExtendedText[] = [];
    const result: [] = await new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        resolve(result);
      });
    });
    result.forEach((row: ExtendedText) => {
      const text = new ExtendedText(row, row.id);
      items.push(text);
    });
    return items;
  };
  getById = async function (id: number) {
    return { id: 1, text: "texto" }; //talvez parse pra Entity;
  };
}

export default extendedTextRepository;
