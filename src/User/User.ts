export class User {
  public readonly id: number;
  public username: string;
  public password: string;

  constructor(props: Omit<User, "id">, id?: number) {
    this.id = id || 0; //uuid();
    this.username = props.username;
    this.password = props.password;
  }
}

//talvez implementar uuid para os objetos
