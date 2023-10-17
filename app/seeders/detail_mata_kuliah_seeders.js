const db = require(".././models");
const DetailMataKuliah = db.detailMatkul;

function initialDetailMataKuliah() {
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 3,
    prodi_id: 1,
    matkul_id: "21IF2010",
  });
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 2,
    prodi_id: 1,
    matkul_id: "21IF2011",
  });
}
module.exports = initialDetailMataKuliah;
