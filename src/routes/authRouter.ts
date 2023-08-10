import { Router } from "express";
import UserController from "../User/UserController";
const authRouter = Router();

authRouter.post("/auth", async (req, res) => {
  const controller = new UserController();
  const { username, password } = req.body;
  const user = await controller.getByUsername(username);

  if (!user || user.password !== password) {
    res.status(401);
    return res.json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ username }, "segredo", { expiresIn: "1h" });

  res.status(200);
  res.json({ token });
});

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function emptyAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  next();
}
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers) {
    return res.status(403).json({ error: "Token inválido" });
  }
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, "segredo", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    // O token é válido, armazene as informações do usuário no objeto de solicitação para uso posterior
    //req.user = decoded as JwtPayload;

    next();
  });
}

export { authRouter, authenticateToken, emptyAuthMiddleware };
