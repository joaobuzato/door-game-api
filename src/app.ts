import express from "express";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
new routes(app);

export { app };
