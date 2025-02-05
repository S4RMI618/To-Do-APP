import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import { RegisterSchema, LoginSchema } from "../models/login.model.js";
import { SALT_ROUNDS } from "../config.js";

export const register = async (req, res) => {
    try {
      // Validación con Zod 
      const parsedData = RegisterSchema.parse(req.body);
      console.log(parsedData);
      const { username, email, password } = parsedData;
  
      // Mejor verificación de usuario existente
      const [existingUser] = await pool.query(
        `SELECT id FROM users WHERE email = ? OR username = ?`,
        [email, username]
      );
  
      if (existingUser.length > 0) {
        return res.status(409).json({ 
          message: "El email o nombre de usuario ya están registrados" 
        });
      }
  
      // Hash seguro con salt generado automáticamente
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
      // Inserción de usuario en la base de datos
      const [result] = await pool.query(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, hashedPassword]
      );
  
      // Verificación correcta de affectedRows
      if (result.affectedRows === 1) {
        return res.status(201).json({
          message: "Usuario creado correctamente",
          id: result.insertId  // Devuelve el ID generado
        });
      }
  
      throw new Error("Inserción fallida.");
  
    } catch (error) {
      // 6. Manejo mejorado de errores
      console.error("Error en registro:", error);
  
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: error.errors.map(err => ({
            field: err.path[0],
            message: err.message
          }))
        });
      }
  
      res.status(500).json({
        message: error.message || "Error interno del servidor"
      });
    }
  };

export const login = async (req, res) => {
    try{
        const parsedData = LoginSchema.parse(req.body);
        const {email, password} = parsedData;

    }catch(e){

    }
};
