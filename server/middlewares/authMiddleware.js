import jwt from "jsonwebtoken";
import db from "../db.js";
import { SECRET_KEY } from "../config.js";

export const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "No autorizado",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    req.user = user[0];
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
