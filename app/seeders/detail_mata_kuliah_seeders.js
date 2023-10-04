const db = require(".././models");
const DetailMataKuliah = db.detailMatkul;

function initialDetailMataKuliah() {
    DetailMataKuliah.create({
        id_detailMatkul: "1",
        tipe: "Teori",
        sks: 3,
        prodi_id: 1,
        matkul_id: "21IF2010"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "2",
        tipe: "Teori",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2011"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "3",
        tipe: "Praktek",
        sks: 1,
        prodi_id: 1,
        matkul_id: "21IF2011"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "4",
        tipe: "Teori",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2012"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "5",
        tipe: "Praktek",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2012"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "6",
        tipe: "Teori",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2013"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "7",
        tipe: "Praktek",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2013"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "7",
        tipe: "Teori",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2014"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "8",
        tipe: "Teori",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2015"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "9",
        tipe: "Praktek",
        sks: 1,
        prodi_id: 1,
        matkul_id: "21IF2015"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "10",
        tipe: "Teori",
        sks: 1,
        prodi_id: 1,
        matkul_id: "21IF2016"
    });
    DetailMataKuliah.create({
        id_detailMatkul: "11",
        tipe: "Praktek",
        sks: 2,
        prodi_id: 1,
        matkul_id: "21IF2016"
    });
}
module.exports = initialDetailMataKuliah;