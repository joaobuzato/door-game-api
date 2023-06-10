export class Condition {
  public readonly id: number;
  public element1: string;
  public type: string;
  public element2: string;
  public action_id: number;

  constructor(props: Omit<Condition, "id">, id?: number) {
    this.id = id || 0; //uuid();
    this.element1 = props.element1;
    this.element2 = props.element2;
    this.type = props.type;
    this.action_id = props.action_id;
  }
}

//talvez implementar uuid para os objetos
