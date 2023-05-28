import { Connection } from "mysql";

export interface Repository {
  //connection: Connection; //por enquanto;
  getAll: () => Promise<Array<any>>;
  getById: (id: number) => any;
  insert: (obj: any) => void;
}
