import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

connectDB();

app.get("/", (req, res) => {
  res.send("Inicio");
});

app.listen(PORT, () => {
  console.log(`>>> Server running on port: ${PORT}`);
});
