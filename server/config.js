import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "test";
export const SECRET_KEY = process.env.JWT_SECRET|| "";
const ROUNDS = process.env.SALT_ROUNDS || 10;
export const SALT_ROUNDS = Number.isNaN(parseInt(ROUNDS)) ? 10 : parseInt(ROUNDS);