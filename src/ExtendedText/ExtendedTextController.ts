import DataBase from "../Infra/DataBase";
import { Controller } from "../Interfaces/Controller";
import { Service } from "../Interfaces/Service";
import { ExtendedText } from "./ExtendedText";
import ExtendedTextRepository from "./ExtendedTextRepository";
import ExtendedTextService from "./ExtendedTextService";

export default class ExtendedTextController
  implements Controller<ExtendedText>
{
  service: Service<ExtendedText>;
  constructor() {
    const database = new DataBase();
    const repository = new ExtendedTextRepository(database);
    this.service = new ExtendedTextService(repository);
  }

  async getAll() {
    return await this.service.getAll();
  }
  async getById(id: number) {
    return await this.service.getById(id);
  }
  async insert(extendedText: ExtendedText) {
    return await this.service.insert(extendedText);
  }
  async update(extendedText: ExtendedText) {
    return await this.service.update(extendedText);
  }
  async delete(id: number) {
    return await this.service.delete(id);
  }
}
