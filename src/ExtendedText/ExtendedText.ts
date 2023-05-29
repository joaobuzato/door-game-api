import { Entity } from "../public/types";

export class ExtendedText extends Entity {
  public readonly id?: number;
  public text: string;
  public sentence: string;
  public room_id: number;

  constructor(props: Omit<ExtendedText, "id">, id?: number) {
    super();
    this.id = id ? id : 0; //uuid();
    this.text = props.text;
    this.sentence = props.sentence;
    this.room_id = props.room_id;

    // if (!id) {
    //   this.id = uuid();
    // }
  }
}

//talvez implementar uuid para os objetos
