import DataBase from "../Infra/DataBase";
import { User } from "./User";

export class UserRepository {
  dataBase: DataBase;

  constructor(dataBase: DataBase) {
    this.dataBase = dataBase;
  }

  async getByUsername(username: string) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await this.dataBase.query<User>(query, [username]);
    return result.length > 0 ? result[0] : null;
  }

  async mount(row: User) {
    const user = new User(row, row.id);
    return user;
  }
}

export default UserRepository;
