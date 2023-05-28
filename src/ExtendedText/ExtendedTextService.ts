import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { ExtendedText } from "./ExtendedText";

export class extendedTextService implements Service {
  repository: Repository;
  constructor(repository: Repository) {
    this.repository = repository;
  }
  //talvez a conexão é com repository
  getAll = async () => {
    try {
      const items = await this.repository.getAll();
      return items;
    } catch (e) {
      throw e;
    }
  };
  getById = async (id: number) => {
    try {
      const item = await this.repository.getById(id);
      return item;
    } catch (e) {
      throw e;
    }
  };
  insert = async (extendedText: ExtendedText) => {
    try {
      this.repository.insert(extendedText);
    } catch (e) {
      throw e;
    }
  };
}

export default extendedTextService;
