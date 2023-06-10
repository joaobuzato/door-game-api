import { Action } from "../Action/Action";
import { Door } from "../Door/Door";
import { ExtendedText } from "../ExtendedText/ExtendedText";

export class Room {
  public readonly id: number;
  public title: string;
  public text: string;
  public path: string;
  public rooms?: ExtendedText[];
  public actions?: Action[];
  public doors?: Door[];

  constructor(props: Omit<Room, "id">, id?: number) {
    this.id = id || 0; //uuid();
    this.title = props.title;
    this.text = props.text;
    this.path = props.path;
  }
}

//talvez implementar uuid para os objetos
