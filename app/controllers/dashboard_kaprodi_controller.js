const db = require('../models');
const Perizinan = db.perizinan;
const Semester = db.semester;
const Mahasiswa = db.mahasiswa;
const Angkatan = db.angkatan;
const Kelas = db.kelas;

exports.findDataCard = (req, res) => {
  const prodi_id = req.params.prodi_id;

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
          prodi_id: prodi_id,
        },
      },
    ],
  });

  // Membuat Promise untuk mengambil data Semester dengan status_semester: 1
  const fetchActiveSemester = Semester.findAll({
    where: { status_semester: 1 },
  });

  // Menjalankan kedua Promise tersebut secara bersamaan
  Promise.all([fetchActiveSemester, fetchPerizinan])
    .then((results) => {
      const semesterData = results[0];
      const perizinanData = results[1];

      const dashboardData = {
        jumlahSakit: 0,
        jumlahIzin: 0,
        tahunAkademik: '',
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
        dashboardData.tahunAkademik = semesterData[0].nama_semester;
      }

      res.send(dashboardData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving data.',
      });
    });
};

exports.findDataGraph = (req, res) => {
  const prodi_id = req.params.prodi_id;

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
          prodi_id: prodi_id,
        },
        include: [
          {
            model: Angkatan,
          },
          {
            model: Kelas,
          },
        ],
      },
    ],
  });

  // Membuat Promise untuk mengambil data Semester dengan status_semester: 1
  const fetchActiveSemester = Semester.findAll({
    where: { status_semester: 1 },
  });

  // Menjalankan kedua Promise tersebut secara bersamaan
  Promise.all([fetchActiveSemester, fetchPerizinan])
    .then((results) => {
      const semesterData = results[0];
      const perizinanData = results[1];

      const graphData = {
        tahunAkademik: semesterData[0].nama_semester,
        sakit: {},
        izin: {},
      };

      const tahunMaksimal = perizinanData[0].id_semester.split('-')[1];
      const jumlahAngkatan = parseInt(prodi_id) + 2;

      perizinanData.forEach((item) => {
        const tahun_angkatan = item.mahasiswa.angkatan.tahun_angkatan;
        const kelas = item.mahasiswa.kela.nama_kelas;
        const selisihTahun = parseInt(tahunMaksimal) - parseInt(tahun_angkatan);
        if (selisihTahun <= jumlahAngkatan - 1) {
          if (!graphData.sakit[tahun_angkatan]) {
            graphData.sakit[tahun_angkatan] = {};
            graphData.izin[tahun_angkatan] = {};
          }

          if (!graphData.sakit[tahun_angkatan][kelas]) {
            graphData.sakit[tahun_angkatan][kelas] = 0;
            graphData.izin[tahun_angkatan][kelas] = 0;
          }

          if (item.jenis === 'Sakit') {
            graphData.sakit[tahun_angkatan][kelas]++;
          } else if (item.jenis === 'Izin') {
            graphData.izin[tahun_angkatan][kelas]++;
          }
        }
      });
      res.send(graphData);
      // res.send(results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving data.',
      });
    });
};
