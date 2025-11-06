import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 URL de tu App Script (cámbiala por la tuya si no es esta)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1jLuwSWGa1zmn3p7J8wi_jgEmPZnZ3Mubg2MJC55soHtEU7HLrxjq9ZWHUsOLQ1c6/exec";

// ✅ Ruta para obtener el menú
app.get("/menu", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Ruta para guardar la selección del empleado
app.post("/seleccion", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔹 Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend de Menú 3A funcionando ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
