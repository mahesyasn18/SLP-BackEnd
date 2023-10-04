const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.create = (req, res) => {
  // Create an mahasiswa
  const mahasiswa = {
    nim: req.body.nim,
    nama: req.body.nama,
    username: req.body.username,
    password: req.body.password,
    no_telp: req.body.no_telp,
    no_telp_orang_tua: req.body.no_telp_orang_tua,
    role_id: 2,
    prodi_id: req.body.prodi_id,
    kelas_id: req.body.kelas_id,
    angkatan_id: req.body.angkatan_id,
  };

  Mahasiswa.create(mahasiswa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Mahasiswa.",
      });
    });
};

exports.findAll = (req, res) => {
  Mahasiswa.findAll({
    include: [db.prodi, db.angkatan, db.kelas],
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

exports.update = (req, res) => {
  const id = req.params.nim;

  Mahasiswa.update(req.body, {
    where: { nim: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mahasiswa was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Mahasiswa with id=${id}. Maybe Mahasiswa was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Mahasiswa with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Mahasiswa.destroy({
    where: { nim: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mahasiswa was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Mahasiswa with id=${id}. Maybe Mahasiswa was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Mahasiswa with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Mahasiswa with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Mahasiswa with id=" + id,
      });
    });
};
