const db = require('.././models');
const Jadwal = db.jadwal;

function initialJadwal() {
  Jadwal.create({
    id_jadwal: '1',
    hari: 'Senin',
    detailMatkul_id: '2',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '2',
    hari: 'Senin',
    detailMatkul_id: '9',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '3',
    hari: 'Senin',
    detailMatkul_id: '1',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '4',
    hari: 'Selasa',
    detailMatkul_id: '6',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '5',
    hari: 'Selasa',
    detailMatkul_id: '8',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '6',
    hari: 'Selasa',
    detailMatkul_id: '5',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '7',
    hari: 'Rabu',
    detailMatkul_id: '11',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '8',
    hari: 'Rabu',
    detailMatkul_id: '12',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '9',
    hari: 'Kamis',
    detailMatkul_id: '4',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '10',
    hari: 'Kamis',
    detailMatkul_id: '3',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '11',
    hari: 'Kamis',
    detailMatkul_id: '10',
    kelas_id: 2,
    semester_id: '01-2023',
  });

  Jadwal.create({
    id_jadwal: '12',
    hari: "Jum'at",
    detailMatkul_id: '7',
    kelas_id: 2,
    semester_id: '01-2023',
  });
}
module.exports = initialJadwal;
