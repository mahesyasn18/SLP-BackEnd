const db = require(".././models");
const DetailMataKuliah = db.detailMatkul;

function initialDetailMataKuliah() {
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 3,
    prodi_id: 2,
    matkul_id: "21IF2010",
  });
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 2,
    prodi_id: 2,
    matkul_id: "21IF2011",
  });
  DetailMataKuliah.create({
    tipe: "Praktek",
    sks: 1,
    prodi_id: 1,
    matkul_id: "21IF2011",
  });
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 1,
    prodi_id: 1,
    matkul_id: "21IF2012",
  });
  DetailMataKuliah.create({
    tipe: "Praktek",
    sks: 3,
    prodi_id: 1,
    matkul_id: "21IF2012",
  });
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 1,
    prodi_id: 1,
    matkul_id: "21IF2013",
  });
  DetailMataKuliah.create({
    tipe: "Praktek",
    sks: 3,
    prodi_id: 1,
    matkul_id: "21IF2013",
  });
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 2,
    prodi_id: 1,
    matkul_id: "21IF2014",
  });
  DetailMataKuliah.create({
    tipe: "Teori",
    sks: 1,
    prodi_id: 1,
    matkul_id: "21IF2015",
  });
  DetailMataKuliah.create({
    tipe: "Praktek",
    sks: 2,
    prodi_id: 1,
    matkul_id: "21IF2015",
  });
}
module.exports = initialDetailMataKuliah;
