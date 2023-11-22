const db = require("../models");
const Perizinan = db.perizinan;
const Semester = db.semester;

exports.findOne = (req, res) => {
  const userId = req.userId;

  const fetchPerizinan = Perizinan.findAll({
    where: {
      nim: userId,
      status: "Diverifikasi",
    },
    include: [
      {
        model: Semester,
        where: {
          //   nim: userId,
          status_semester: 1,
        },
      },
    ],
  });

  const fetchActiveSemester = Semester.findAll({
    where: { status_semester: 1 },
  });

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
        const createdAt = new Date(item.createdAt);
        const month = createdAt.toLocaleString("default", { month: "long" });
        if (item.jenis === "Sakit") {
          dashboardData.jumlahSakit++;
        } else if (item.jenis === "Izin") {
          dashboardData.jumlahIzin++;
        }
      });

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
};

// exports.findAll = (req, res) => {
//   const userId = req.userId;
//   Perizinan.findAll({
//     where: {
//       nim: userId,
//       status: {
//         [Op.not]: "Draft",
//       },
//     },
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving Kelas.",
//       });
//     });
// };

exports.findAll = (req, res) => {
  const userId = req.userId;
  //   const walidosen_id = req.params.walidosen_id;
  Perizinan.findAll({
    where: {
      nim: userId,
    },
    include: [
      {
        model: Semester,
        where: {
          status_semester: 1,
        },
      },
      {
        model: db.mahasiswa,
        // where: {
        //   walidosen_id: walidosen_id,
        // },
      },
    ],
  })
    .then((data) => {
      const dashboardData = {
        jumlahSakit: 0,
        jumlahIzin: 0,
        totalPermohonan: 0,
        jumlah_sakit_perbulan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        jumlah_izin_perbulan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
      data.forEach((item) => {
        const month = item.createdAt.getMonth();
        if (item.jenis === "Sakit" && item.status === "Diverifikasi") {
          dashboardData.jumlahSakit++;
          dashboardData.jumlah_sakit_perbulan[month]++;
        } else if (item.jenis === "Izin" && item.status === "Diverifikasi") {
          dashboardData.jumlahIzin++;
          dashboardData.jumlah_izin_perbulan[month]++;
        }
        if (item.status === "Menunggu Verifikasi") {
          dashboardData.totalPermohonan++;
        }
      });
      res.send(dashboardData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};
