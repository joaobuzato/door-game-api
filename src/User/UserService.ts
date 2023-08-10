import { User } from "./User";
import UserRepository from "./UserRepository";

export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  async getByUsername(username: string) {
    return await this.repository.getByUsername(username);
  }
}

export default UserService;
