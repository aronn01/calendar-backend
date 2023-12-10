const express = require("express");
var cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//01crear el servidor de express
const app = express();

//Base de Datos
dbConnection();

// CORS
app.use(cors());

//05 Lectura y parceo del body
app.use(express.json());

//03 Rutas (ejemplo)
// app.get("/", (req, res) => {
//   res.json({ ok: true });
// });
app.use("/api/auth", require("./routes/auth"));

//rutas de los eventos
app.use("/api/events", require("./routes/events"));

//Directorio Publico
app.use(express.static("public"));

//02 Escuchar Peticiones
//04 utilizamos el .envy los process
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});