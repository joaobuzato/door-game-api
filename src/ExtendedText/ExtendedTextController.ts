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
    try {
      return await this.service.getAll();
    } catch (e) {
      throw e;
    }
  }
  async getById(id: number) {
    try {
      return await this.service.getById(id);
    } catch (e) {
      throw e;
    }
  }
  async insert(extendedText: ExtendedText) {
    try {
      this.service.insert(extendedText);
    } catch (e) {
      throw e;
    }
  }
  async update(extendedText: ExtendedText) {
    try {
      this.service.update(extendedText);
    } catch (e) {
      throw e;
    }
  }
  async delete(id: number) {
    try {
      return this.service.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
