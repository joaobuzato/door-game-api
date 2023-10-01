export class Door {
  public readonly id: number;
  public path: string;
  public text: string;
  public color: string;
  public room_id: number;

  constructor(props: Omit<Door, "id">, id?: number) {
    this.id = id || 0; //uuid();
    this.path = props.path;
    this.text = props.text;
    this.color = props.color;
    this.room_id = props.room_id;
  }
}
