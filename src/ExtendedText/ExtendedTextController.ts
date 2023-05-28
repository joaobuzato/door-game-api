import { Controller } from "../Interfaces/Controller";
import { Service } from "../Interfaces/Service";
import { ExtendedText } from "./ExtendedText";
import extendedTextRepository from "./ExtendedTextRepository";
import extendedTextService from "./ExtendedTextService";

export default class ExtendedTextController implements Controller {
  service: Service;
  constructor() {
    const repository = new extendedTextRepository();
    this.service = new extendedTextService(repository);
  }

  getAll = async () => {
    try {
      return await this.service.getAll();
    } catch (e) {
      throw e;
    }
  };
  getById = async (id: number) => {
    try {
      return await this.service.getById(id);
    } catch (e) {
      throw e;
    }
  };
  insert = async (extendedText: ExtendedText) => {
    try {
      this.service.insert(extendedText);
    } catch (e) {
      throw e;
    }
  };
}
