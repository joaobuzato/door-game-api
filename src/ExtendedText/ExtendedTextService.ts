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
    const items = await this.repository.getAll();
    return items;
  };
  getById = async (id: number) => {
    const item = await this.repository.getById(id);
    return item;
  };
  insert = async (extendedText: ExtendedText) => {
    await this.repository.insert(extendedText);
  };
}

export default extendedTextService;
