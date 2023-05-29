import { Service } from "./Service";

export interface Controller<T> {
  service: Service<T>;
  getAll: () => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => void;
  update: (obj: T) => void;
  delete: (id: number) => void;
}
