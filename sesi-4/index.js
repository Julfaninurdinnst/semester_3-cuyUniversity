const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./module");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.query("SELECT * FROM tbl_mahasiswa", (err, result) => {
    response(200, result, "get all datas from tbl-mahasiswa", res);
  });
});
app.get("/find", (req, res) => {
  console.log("find nim: ", req.query.nim);
  const sql = `SELECT nama_lengkap FROM tbl_mahasiswa WHERE nim = ${req.query.nim}`;

  db.query(sql, (err, result) => {
    response(200, result, "hasil pencarian data mahasiswa", res);
  });
});

app.post("/login", (req, res) => {
  console.log({ requestFromOutside: req.body });
  res.send("login berhasil");
});

app.put("/username", (req, res) => {
  console.log({ updateData: req.body });
  res.send("update berhasil");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
