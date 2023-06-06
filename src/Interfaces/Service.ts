import { Entity } from "../public/types";
import { Repository } from "./Repository";

export interface Service<T> {
  repository: Repository<T>;
  getAll: () => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => Promise<void>;
  update: (obj: T) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
