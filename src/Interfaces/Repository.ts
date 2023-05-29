import { Connection } from "mysql";
import DataBase from "../Infra/DataBase";

export interface Repository<T> {
  dataBase: DataBase; //por enquanto;
  getAll: () => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => void;
  update: (obj: T) => void;
  delete: (id: number) => void;
}
