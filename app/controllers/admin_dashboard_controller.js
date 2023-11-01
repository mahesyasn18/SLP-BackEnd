const db = require('../models');
const Perizinan = db.perizinan;
const Semester = db.semester;

exports.findAll = (req, res) => {
  const userId = req.userId;
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
    ],
  })
    .then((data) => {
      const dashboardData = { jumlahSakit: 0, jumlahIzin: 0 };
      data.forEach((item) => {
        if (item.jenis === 'Sakit') {
          dashboardData.jumlahSakit++;
        } else if (item.jenis === 'Izin') {
          dashboardData.jumlahIzin++;
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
