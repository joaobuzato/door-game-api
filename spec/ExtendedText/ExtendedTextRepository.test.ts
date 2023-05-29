// import { describe, expect, test } from "@jest/globals";

// import { ExtendedTextRepository } from "../../src/ExtendedText/ExtendedTextRepository";
// import { connection } from "../../src/Infra/connection";
// jest.mock("mysql");
// //jest.mock("../../src/Infra/connection");

// describe("extendedTextRepository", () => {
//   describe("getAll", () => {
//     const extendedTexts = [
//       {
//         id: 1,
//         sentence: "sentence1",
//         text: "text1",
//         room_id: "room_id1",
//       },
//       {
//         id: 2,
//         sentence: "sentence2",
//         text: "text2",
//         room_id: "room_id2",
//       },
//     ];
//     const repository = new ExtendedTextRepository();
//     beforeEach(() => {});
//     test("should getAll correctly", async () => {
//       repository.con.query = jest.fn();
//     });
//   });
// });

//MUDANÇA DE PLANOS: connection deve ser inserido por parametro no repository
