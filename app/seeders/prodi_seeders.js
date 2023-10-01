const db = require(".././models");
const Prodi = db.prodi;

function initialProdi() {
    Prodi.create({
        id_prodi: 1,
        nama_prodi: "D3",
    });
    Prodi.create({
        id_prodi: 2,
        nama_prodi: "D4",
    });
}

module.exports = initialProdi;