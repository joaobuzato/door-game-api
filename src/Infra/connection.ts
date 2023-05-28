import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

// TODO: pensar nessa conexão
export class connection {
  static connect() {
    return mysql.createConnection({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
  }
}
