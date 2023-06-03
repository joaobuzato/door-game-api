import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { ExtendedText } from "./ExtendedText";

export class ExtendedTextService implements Service<ExtendedText> {
  repository: Repository<ExtendedText>;
  constructor(repository: Repository<ExtendedText>) {
    this.repository = repository;
  }
  async getAll() {
    try {
      return await this.repository.getAll();
    } catch (e) {
      throw e;
    }
  }
  async getById(id: number) {
    try {
      const item = await this.repository.getById(id);
      return item;
    } catch (e) {
      throw e;
    }
  }
  async insert(extendedText: ExtendedText) {
    try {
      if (!this.validate(extendedText)) {
        throw new Error("extendedText Inválido");
      }
      await this.repository.insert(extendedText);
    } catch (e) {
      throw e;
    }
  }
  async update(extendedText: ExtendedText) {
    try {
      if (!this.validate(extendedText)) {
        throw new Error("extendedText Inválido");
      }
      this.repository.update(extendedText);
    } catch (e) {
      throw e;
    }
  }
  async delete(id: number) {
    try {
      this.repository.delete(id);
    } catch (e) {
      throw e;
    }
  }

  validate = (extendedText: ExtendedText) => {
    let valid = true;
    if (1 > extendedText.text.length || extendedText.text.length > 280) {
      valid = false;
    }
    if (
      1 > extendedText.sentence.length ||
      extendedText.sentence.length > 140
    ) {
      valid = false;
    }
    if (extendedText.room_id < 1) {
      valid = false;
    }
    return valid;
  };
}

export default ExtendedTextService;
