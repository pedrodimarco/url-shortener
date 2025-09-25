import express from "express";
import morgan from "morgan";
import cors from "cors";
import urlRoutes from "./routes/urls.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", urlRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
