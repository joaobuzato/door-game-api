export class ExtendedText {
  public readonly id: number;
  public name: string;

  constructor(props: Omit<ExtendedText, "id">, id?: number) {
    this.id = id ? id : 0; //uuid();
    this.name = props.name;

    // if (!id) {
    //   this.id = uuid();
    // }
  }
}

//talvez implementar uuid para os objetos
