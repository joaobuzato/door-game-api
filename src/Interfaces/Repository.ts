interface Repository {
  connection: string; //por enquanto;
  getAll: () => Promise<Array<any>>;
  getById: (id: number) => any;
}
