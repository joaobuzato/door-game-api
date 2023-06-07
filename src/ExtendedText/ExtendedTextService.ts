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
    const item = await this.repository.getById(id);
    return item;
  }
  async insert(extendedText: ExtendedText) {
    if (!this.validate(extendedText)) {
      throw new Error("extendedText Inválido");
    }
    await this.repository.insert(extendedText);
  }
  async update(extendedText: ExtendedText) {
    if (!this.validate(extendedText)) {
      throw new Error("extendedText Inválido");
    }
    await this.repository.update(extendedText);
  }
  async delete(id: number) {
    this.repository.delete(id);
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
