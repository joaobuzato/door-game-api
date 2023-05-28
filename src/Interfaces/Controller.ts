import { Service } from "./Service";

export interface Controller {
  service: Service;
  getAll: () => Promise<Array<any>>;
  getById: (id: number) => any;
  insert: (obj: any) => void;
}
