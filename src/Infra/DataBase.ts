import mysql, { Connection } from "mysql";
import dotenv from "dotenv";
dotenv.config();

// TODO: pensar nessa conexão
export class DataBase {
  connection: Connection;
  constructor() {
    this.connection = mysql.createConnection({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
  }
  query = async <T>(
    query: string,
    options: Array<string | number> = []
  ): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      this.connection.query(query, options, (err, result) => {
        if (err) {
          console.log(err);
          reject([]);
        }
        resolve(result);
      });
    });
  };
}
