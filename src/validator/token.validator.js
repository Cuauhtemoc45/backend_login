import jwt from "jsonwebtoken";

export function validateToken(req, res, next) {
  const tkn = req.cookies.token;
  if (tkn === undefined) {
    return res.status(401).send("ACCESO NO AUTORIZADO").end();
  } else {
    next();
  }
}
