const db = require(".././models");
const Jadwal = db.jadwal;

function initialJadwal() {
    Jadwal.create({
      id_jadwal:"1",
      hari:"Senin"
    });

    Jadwal.create({
        id_jadwal:"2",
        hari:"Senin"
      });
      
      Jadwal.create({
        id_jadwal:"3",
        hari:"Senin"
      });
      
      Jadwal.create({
        id_jadwal:"4",
        hari:"Selasa"
      });

      Jadwal.create({
        id_jadwal:"5",
        hari:"Selasa"
      });

      Jadwal.create({
        id_jadwal:"6",
        hari:"Selasa"
      });

      Jadwal.create({
        id_jadwal:"7",
        hari:"Rabu"
      });

      Jadwal.create({
        id_jadwal:"8",
        hari:"Rabu"
      });

      Jadwal.create({
        id_jadwal:"9",
        hari:"Kamis"
      });

      Jadwal.create({
        id_jadwal:"10",
        hari:"Kamis"
      });

      Jadwal.create({
        id_jadwal:"11",
        hari:"Kamis"
      });

      Jadwal.create({
        id_jadwal:"12",
        hari:"Jum'at"
      });

  }
  module.exports = initialJadwal;