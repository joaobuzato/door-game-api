import { Entity } from "../public/types";
import { Repository } from "./Repository";

export interface Service<T> {
  repository: Repository<T>;
  getAll: () => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => void;
  update: (obj: T) => void;
  delete: (id: number) => void;
}
