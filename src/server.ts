import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log("API UP! Port:" + port);
});
