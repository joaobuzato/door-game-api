import DataBase from "../Infra/DataBase";

export interface Repository<T> {
  dataBase: DataBase; //por enquanto;
  getAll: (filters?: { [key: string]: string }) => Promise<Array<T>>;
  getById: (id: number) => Promise<T | null>;
  insert: (obj: T) => Promise<{ success: boolean }>;
  update: (obj: T) => Promise<{ success: boolean }>;
  delete: (id: number) => Promise<{ success: boolean }>;
}
