import { Service } from "./Service";

export interface Controller<T> {
  service: Service<T>;
  getAll: () => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => Promise<void>;
  update: (obj: T) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
