const db = require("../models");
const Perizinan = db.perizinan;
// const Mahasiswa = db.mahasiswa;
// const DosenWali = db.dosenWali;

// exports.findAll = (req, res) => {
//   const userId = req.userId; // ID
//   Perizinan.findAll({
//     include: [
//       {
//         model: Mahasiswa,
//         as: "mahasiswa", // Sesuaikan dengan alias asosiasi yang sesuai di model Anda
//         where: {
//           nim: Perizinan.nim,
//         },
//         include: [
//           {
//             model: DosenWali,
//             as: "dosenWali", // Sesuaikan dengan alias asosiasi yang sesuai di model Anda
//             where: {
//               id_dosenwali: userId, // Cocokkan dengan ID DosenWali
//               angkatan_id: Mahasiswa.angkatan_id,
//               kelas_id: Mahasiswa.kelas_id,
//               prodi_id: Mahasiswa.prodi_id,
//             },
//           },
//         ],
//       },
//     ],
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
  Perizinan.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Perizinan.update(req.body, {
    where: { id_perizinan: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Perizinan was approved successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Perizinan with id=${id}. Maybe Perizinan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Mahasiswa with id=" + id,
      });
    });
};

exports.findIzin = (req, res) => {
  Perizinan.findAll({
    where: {
      jenis: "Izin", // Cocokkan dengan ID DosenWali
      status: "Menunggu Verifikasi",
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.findSakit = (req, res) => {
  Perizinan.findAll({
    where: {
      jenis: "Sakit", // Cocokkan dengan ID DosenWali
      status: "Menunggu Verifikasi",
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};