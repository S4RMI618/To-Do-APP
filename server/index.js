import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import indexRoutes from "./routes/index.routes.js";
import { PORT } from "./config.js";

const port = PORT;

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/home", indexRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server on port http://localhost:${port}`);
});
