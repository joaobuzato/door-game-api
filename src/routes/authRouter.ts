import { Router } from "express";
const authRouter = Router();

authRouter.post("/auth", (req, res) => {
  const { username, password } = req.body;

  if (username === "usuario" && password === "senha") {
    const token = jwt.sign({ username }, "segredo", { expiresIn: "1h" });

    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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
