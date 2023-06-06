import DataBase from "../Infra/DataBase";

export interface Repository<T> {
  dataBase: DataBase; //por enquanto;
  getAll: () => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => Promise<void>;
  update: (obj: T) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
