const db = require(".././models");
const MataKuliah = db.matakuliah;

function initialMataKuliah() {
    MataKuliah.create({
        id_matakuliah: "21IF2010",
        nama_matakuliah: "Matematika Diskrit"
    });
    MataKuliah.create({
        id_matakuliah: "21IF2011",
        nama_matakuliah: "Pemrograman Beriorientasi Objek"
    });
    MataKuliah.create({
        id_matakuliah: "21IF2012",
        nama_matakuliah: "Basis Data"
    });
    MataKuliah.create({
        id_matakuliah: "21IF2013",
        nama_matakuliah: "Pengantar Rekayasa Perangkat Lunak"
    });
    MataKuliah.create({
        id_matakuliah: "21IF2014",
        nama_matakuliah: "Aljabar Linear"
    });
    MataKuliah.create({
        id_matakuliah: "21IF2015",
        nama_matakuliah: "Komputer Grafik"
    });
    MataKuliah.create({
        id_matakuliah: "21IF2016",
        nama_matakuliah: "Proyek 3"
    });
}
module.exports = initialMataKuliah;