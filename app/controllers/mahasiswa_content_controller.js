const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.mahasiswaBoard = (req, res) => {
  res.status(200).send("Mahasiswa Content.");
};
