import extendedTextRepository from "./ExtendedTextRepository";
import extendedTextService from "./ExtendedTextService";

export default class ExtendedTextController implements Controller {
  service: Service;
  constructor() {
    const repository = new extendedTextRepository();
    this.service = new extendedTextService(repository);
  }

  getAll = async () => {
    return await this.service.getAll();
  };
  getById = async (id: number) => {
    return await this.service.getById(id);
  };
}
