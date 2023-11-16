const db = require('../models');
const Perizinan = db.perizinan;
const Semester = db.semester;
const Mahasiswa = db.mahasiswa;

exports.findDataGraph = (req, res) => {
  const prodi = req.params.id;
  Perizinan.findAll({
    where: {
      status: 'Diverifikasi',
    },
    include: [
      {
        model: Semester,
        where: {
          status_semester: 1,
        },
      },
      {
        model: Mahasiswa,
        where: {
          prodi_id: prodi,
        },
      },
    ],
  })
    .then((data) => {
      const dashboardData = {
        jumlahSakit: 0,
        jumlahIzin: 0,
        totalPermohonan: 0,
        jumlah_sakit_perbulan: [0, 0, 0, 0, 0],
        jumlah_izin_perbulan: [0, 0, 0, 0, 0],
      };
      data.forEach((item) => {
        const month = item.createdAt.getMonth();
        if (item.jenis === 'Sakit') {
          dashboardData.jumlahSakit++;
          dashboardData.jumlah_sakit_perbulan[month]++;
        } else if (item.jenis === 'Izin') {
          dashboardData.jumlahIzin++;
          dashboardData.jumlah_izin_perbulan[month]++;
        }
      });
      res.send(dashboardData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Kelas.',
      });
    });
};

exports.findDataCard = (req, res) => {
  const userId = req.userId;

  // Membuat Promise untuk mengambil data Perizinan
  const fetchPerizinan = Perizinan.findAll({
    where: {
      status: 'Diverifikasi',
    },
    include: [
      {
        model: Semester,
        where: {
          status_semester: 1,
        },
      },
      {
        model: Mahasiswa,
        where: {
          prodi_id: prodi,
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
        jumlahPermohonan: 0,
        jumlahSakit: 0,
        jumlahIzin: 0,
      };

      perizinanData.forEach((item) => {
        if (item.jenis === 'Sakit') {
          dashboardData.jumlahSakit++;
        } else if (item.jenis === 'Izin') {
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
        message: err.message || 'Some error occurred while retrieving data.',
      });
    });
};
