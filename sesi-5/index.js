const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./module");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server siap");
});
app.get("/mahasiswa", (req, res) => {
  res.send("list mahasiswa");
});

app.post("/mahasiswa", (req, res) => {
  res.send("ini posting");
});
app.put("/mahasiswa", (req, res) => {
  res.send("ini update");
});
app.delete("/mahasiswa", (req, res) => {
  res.send("ini delete");
});

app.listen(port, () => {
  console.log("server sedang berjalan di port " + port);
});
