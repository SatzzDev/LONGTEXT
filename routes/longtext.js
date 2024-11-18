const express = require("express");
const { readData, writeData } = require("../utils/jsonHelper");

const router = express.Router();

// Homepage
router.get("/", (req, res) => {
  const textList = readData();
  res.render("index", { textList });
});

// Form tambah surat
router.get("/form", (req, res) => {
  res.render("form");
});

router.post("/form", (req, res) => {
  const { nama, kategori, deskripsi } = req.body;

  const textList = readData();
  textList.push({
    nama,
    kategori,
    deskripsi,
    tanggal: new Date().toISOString(),
    disalin: 0, // Baru ditambahkan
    like: 0, // Baru ditambahkan
  });
  writeData(textList);

  res.redirect("/");
});

// Pencarian surat
router.get("/search", (req, res) => {
  const { kategori } = req.query;
  const text = readData();
  const results = textList.filter((izin) =>
    izin.kategori.toLowerCase().includes(kategori.toLowerCase())
  );
  res.render("search", { results });
});

// Tambahkan jumlah disalin
router.post("/copy/:id", (req, res) => {
  const { id } = req.params;
  const textList = readData();

  if (textList[id]) {
    textList[id].disalin += 1;
    writeData(textList);
    return res.json({ success: true, text: jsonSuratIzin[id].deskripsi });
  }

  res.status(404).json({ success: false, message: "Data tidak ditemukan." });
});

// Tambahkan jumlah like
router.post("/like/:id", (req, res) => {
  const { id } = req.params;
  const textList = readData();

  if (textList[id]) {
    textList[id].like += 1;
    writeData(textList);
    return res.json({ success: true, message: "Berhasil menambahkan jumlah suka." });
  }

  res.status(404).json({ success: false, message: "Data tidak ditemukan." });
});


module.exports = router;
