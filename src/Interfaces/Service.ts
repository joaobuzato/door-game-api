interface Service {
  repository: Repository;
  getAll: () => Promise<Array<any>>;
  getById: (id: number) => any;
}