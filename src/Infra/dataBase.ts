import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export class dataBase {
  connection: mysql.Connection;
  constructor() {
    this.connection = this.createConnection();
  }

  createConnection() {
    return mysql.createConnection({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
  }

  async getConnection() {
    if (!this.connection) {
      this.connection = this.createConnection();
    }
    return this.connection;
  }
}
