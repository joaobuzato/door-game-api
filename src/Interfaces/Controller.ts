import { Service } from "./Service";

export interface Controller<T> {
  service: Service<T>;
  getAll: () => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => Promise<{ success: boolean }>;
  update: (obj: T) => Promise<{ success: boolean }>;
  delete: (id: number) => Promise<{ success: boolean }>;
}
