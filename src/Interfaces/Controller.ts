import { Service } from "./Service";

export interface Controller<T> {
  service: Service<T>;
  getAll: (filters?: { [key: string]: string }) => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => Promise<{ lastId: number; success: boolean }>;
  update: (obj: T) => Promise<{ success: boolean }>;
  delete: (id: number) => Promise<{ success: boolean }>;
}
