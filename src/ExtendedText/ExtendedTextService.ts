import { Repository } from "../Interfaces/Repository";
import { Service } from "../Interfaces/Service";
import { ExtendedText } from "./ExtendedText";

export class ExtendedTextService implements Service<ExtendedText> {
  repository: Repository<ExtendedText>;
  constructor(repository: Repository<ExtendedText>) {
    this.repository = repository;
  }
  async getAll() {
    return await this.repository.getAll();
  }
  async getById(id: number) {
    return await this.repository.getById(id);
  }
  async insert(extendedText: ExtendedText) {
    if (!this.validate(extendedText)) {
      return { success: false };
    }
    return await this.repository.insert(extendedText);
  }
  async update(extendedText: ExtendedText) {
    if (!this.validate(extendedText)) {
      return { success: false };
    }
    return await this.repository.update(extendedText);
  }
  async delete(id: number) {
    return await this.repository.delete(id);
  }

  validate = (extendedText: ExtendedText) => {
    if (
      !extendedText.text ||
      1 > extendedText.text.length ||
      extendedText.text.length > 280
    ) {
      return false;
    }
    if (
      !extendedText.sentence ||
      1 > extendedText.sentence.length ||
      extendedText.sentence.length > 140
    ) {
      return false;
    }
    if (extendedText.room_id < 1) {
      return false;
    }
    return true;
  };
}

export default ExtendedTextService;
