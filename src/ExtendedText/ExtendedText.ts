export class ExtendedText {
  public readonly id: number;
  public text: string;

  constructor(props: Omit<ExtendedText, "id">, id?: number) {
    this.id = id ? id : 0; //uuid();
    this.text = props.text;
    //console.log(this);

    // if (!id) {
    //   this.id = uuid();
    // }
  }
}

//talvez implementar uuid para os objetos
