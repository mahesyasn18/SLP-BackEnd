const db = require(".././models");
const Kelas = db.kelas;

function initialKelas() {
    Kelas.create({
        id_kelas: 1,
        nama_kelas: "1A" 
     });
     Kelas.create({
         id_kelas: 2,
         nama_kelas: "1B" 
     });
     Kelas.create({
         id_kelas: 3,
         nama_kelas: "1C" 
     });
     Kelas.create({
         id_kelas: 4,
         nama_kelas: "2A" 
     });
     Kelas.create({
         id_kelas: 5,
         nama_kelas: "2B" 
     });
     Kelas.create({
         id_kelas: 6,
         nama_kelas: "3A" 
     });
     Kelas.create({
         id_kelas: 7,
         nama_kelas: "3B" 
     });
     Kelas.create({
         id_kelas: 8,
         nama_kelas: "4A" 
     });
     Kelas.create({
         id_kelas: 9,
         nama_kelas: "4B" 
     });
}

module.exports = initialKelas

