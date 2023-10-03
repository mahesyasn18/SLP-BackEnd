const db = require(".././models");
const Angkatan = db.angkatan;

function initialAngkatan() {
  Angkatan.create({
    id_angkatan: 1,
    tahun_angkatan: "2020",
  });
  Angkatan.create({
    id_angkatan: 2,
    tahun_angkatan: "2021",
  });
  Angkatan.create({
    id_angkatan: 3,
    tahun_angkatan: "2022",
  });
  Angkatan.create({
    id_angkatan: 4,
    tahun_angkatan: "2023",
  });
}

module.exports = initialAngkatan;
