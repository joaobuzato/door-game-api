import DataBase from "../Infra/DataBase";

import UserRepository from "./UserRepository";
import UserService from "./UserService";

export default class UserController {
  service: UserService;
  constructor() {
    const database = new DataBase();
    const repository = new UserRepository(database);
    this.service = new UserService(repository);
  }

  async getByUsername(username: string) {
    return await this.service.getByUsername(username);
  }
}
