const db = require("../models");
const Perizinan = db.perizinan;
const Semester = db.semester;

exports.findAll = (req, res) => {
  const userId = req.userId;

  // Membuat Promise untuk mengambil data Perizinan
  const fetchPerizinan = Perizinan.findAll({
    where: {
      status: "Diverifikasi",
    },
    include: [
      {
        model: Semester,
        where: {
          status_semester: 1,
        },
      },
    ],
  });

  // Membuat Promise untuk mengambil data Semester dengan status_semester: 1
  const fetchActiveSemester = Semester.findAll({
    where: { status_semester: 1 },
  });

  // Menjalankan kedua Promise tersebut secara bersamaan
  Promise.all([fetchPerizinan, fetchActiveSemester])
    .then((results) => {
      const perizinanData = results[0];
      const semesterData = results[1];

      const dashboardData = {
        jumlahSakit: 0,
        jumlahIzin: 0,
        tahun_akademik: null,
      };

      perizinanData.forEach((item) => {
        if (item.jenis === "Sakit") {
          dashboardData.jumlahSakit++;
        } else if (item.jenis === "Izin") {
          dashboardData.jumlahIzin++;
        }
      });

      // Jika ada data Semester yang cocok
      if (semesterData.length > 0) {
        dashboardData.tahun_akademik = semesterData[0].nama_semester;
      }

      res.send(dashboardData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
    console.log('Perizinan Data:', perizinanData);
console.log('Semester Data:', semesterData);
};
