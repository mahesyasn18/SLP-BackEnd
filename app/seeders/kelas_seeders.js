const db = require(".././models");
const Kelas = db.kelas;

function initialKelas() {
  Kelas.create({
    id_kelas: 1,
    nama_kelas: "A",
  });
  Kelas.create({
    id_kelas: 2,
    nama_kelas: "B",
  });
  Kelas.create({
    id_kelas: 3,
    nama_kelas: "C",
  });
}

module.exports = initialKelas;
