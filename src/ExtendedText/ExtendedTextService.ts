import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { ExtendedText } from "./ExtendedText";

export class ExtendedTextService implements Service<ExtendedText> {
  repository: Repository<ExtendedText>;
  constructor(repository: Repository<ExtendedText>) {
    this.repository = repository;
  }
  //talvez a conexão é com repository
  getAll = async () => {
    try {
      return await this.repository.getAll();
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
  update = async (extendedText: ExtendedText) => {
    try {
      this.repository.update(extendedText);
    } catch (e) {
      throw e;
    }
  };
  delete = async (id: number) => {
    try {
      this.repository.delete(id);
    } catch (e) {
      throw e;
    }
  };
}

export default ExtendedTextService;
