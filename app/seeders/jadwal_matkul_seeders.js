const db = require(".././models");
const Jadwal = db.jadwal;

function initialJadwal() {
  Jadwal.create({
    hari: "Senin",
    detailMatkul_id: "2",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Senin",
    detailMatkul_id: "9",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Senin",
    detailMatkul_id: "1",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Selasa",
    detailMatkul_id: "6",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Selasa",
    detailMatkul_id: "8",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Selasa",
    detailMatkul_id: "5",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Rabu",
    detailMatkul_id: "11",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Rabu",
    detailMatkul_id: "12",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Kamis",
    detailMatkul_id: "4",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Kamis",
    detailMatkul_id: "3",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Kamis",
    detailMatkul_id: "10",
    kelas_id: 2,
    semester_id: "01-2023",
  });

  Jadwal.create({
    hari: "Jum'at",
    detailMatkul_id: "7",
    kelas_id: 2,
    semester_id: "01-2023",
  });
}
module.exports = initialJadwal;
