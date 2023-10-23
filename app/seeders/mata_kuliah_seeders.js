const db = require(".././models");
const MataKuliah = db.matakuliah;

function initialMataKuliah() {
  MataKuliah.create({
    id_matakuliah: "21IF2010",
    nama_matakuliah: "Matematika Diskrit",
  });
  MataKuliah.create({
    id_matakuliah: "21IF2011",
    nama_matakuliah: "Pemrograman Beriorientasi Objek",
  });
  MataKuliah.create({
    id_matakuliah: "21IF2012",
    nama_matakuliah: "Basis Data",
  });
}
module.exports = initialMataKuliah;
