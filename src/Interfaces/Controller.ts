interface Controller {
  service: Service;
  getAll: () => Promise<Array<any>>;
  getById: (id: number) => any;
}
