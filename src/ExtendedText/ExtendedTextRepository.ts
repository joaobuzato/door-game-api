export class extendedTextRepository implements Repository {
  connection = "conexão teste";
  getAll = async function () {
    //aqui vai ter a conexão com o banco e retornará uma lista de extendedText.
    return [{ id: 1, text: "texto testeeeeee" }];
  };
  getById = async function (id: number) {
    return { id: 1, text: "texto" }; //talvez parse pra Entity;
  };
}

export default extendedTextRepository;
