const db = require(".././models");
const DosenPengampu = db.dosen;

function initialDosen() {
  DosenPengampu.create({
    kode_dosen: "KO004N",
    nama_dosen: "SUPRIHANTO",
    email: "supri@jtk.com",
  });
}

module.exports = initialDosen;
