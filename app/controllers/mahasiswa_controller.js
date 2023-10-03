const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.create = (req, res) => {
  if (!req.body.nim) {
    res.status(400).send({
      message: "nim cannot be empty!",
    });
    return;
  } else if (!req.body.nama) {
    res.status(400).send({
      message: "nama cannot be empty!",
    });
    return;
  } else if (!req.body.username) {
    res.status(400).send({
      message: "username cannot be empty!",
    });
    return;
  } else if (!req.body.password) {
    res.status(400).send({
      message: "password cannot be empty!",
    });
    return;
  } else if (!req.body.no_telp) {
    res.status(400).send({
      message: "no_telp cannot be empty!",
    });
    return;
  } else if (!req.body.no_telp_orang_tua) {
    res.status(400).send({
      message: "no_telp_orang_tua cannot be empty!",
    });
    return;
  } else if (!req.body.prodiId) {
    res.status(400).send({
      message: "prodi cannot be empty!",
    });
    return;
  } else if (!req.body.kelasId) {
    res.status(400).send({
      message: "kelas cannot be empty!",
    });
    return;
  } else if (!req.body.angkatanId) {
    res.status(400).send({
      message: "Angkatan cannot be empty!",
    });
    return;
  }

  // Create an mahasiswa
  const mahasiswa = {
    nim: req.body.nim,
    nama: req.body.nama,
    username: req.body.username,
    password: req.body.password,
    no_telp: req.body.no_telp,
    no_telp_orang_tua: req.body.no_telp_orang_tua,
    roleId: 2,
    prodiId: req.body.prodiId,
    kelasId: req.body.kelasId,
    angkatan: req.body.angkatanId,
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
  Mahasiswa.findAll()
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
