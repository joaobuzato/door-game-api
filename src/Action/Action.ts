export class Action {
  public readonly id?: number;
  public type: string;
  public button_text: string;
  public element: string;
  public qtd: number;
  public room_id: number;

  constructor(props: Omit<Action, "id">, id?: number) {
    this.id = id ? id : 0; //uuid();
    this.type = props.type;
    this.button_text = props.button_text;
    this.element = props.element;
    this.qtd = props.qtd;
    this.room_id = props.room_id;
  }
}
