const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./module");
const response = require("./response");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  response(200, "ini data", "ini message", res);
});
app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM tbl_mahasiswa";
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "semua data berhasil di load", res);
  });
});
app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM tbl_mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "ini message ", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  const sql = `INSERT INTO tbl_mahasiswa (nim,nama_lengkap,kelas,alamat) VALUES (${nim},"${nama_lengkap}","${kelas}","${alamat}")`;
  db.query(sql, (err, result) => {
    if (err) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "Data berhasil ditambahkan", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  const sql = `UPDATE tbl_mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}" , alamat= "${alamat}" WHERE nim= ${nim}`;
  db.query(sql, (err, result) => {
    if (err) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Data berhasil diupdate", res);
    } else {
      response(404, "user not found", "nim tidak ada", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM tbl_mahasiswa WHERE nim =${nim}`;
  db.query(sql, (err, result) => {
    if (err) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isdeleted: result.affectedRows,
      };
      response(200, data, "Data berhasil dihapus", res);
    } else {
      response(404, "user not found", "nim tidak ada", res);
    }
  });
});

app.listen(port, () => {
  console.log("server sedang berjalan di port " + port);
});
