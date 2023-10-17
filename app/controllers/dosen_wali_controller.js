const db = require("../models");
const Dosen_Wali = db.dosenWali;

exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "username dosen wali cannot be empty!",
    });
    return;
  } else if (!req.body.password) {
    res.status(400).send({
      message: "password dosen wali cannot be empty!",
    });
    return;
  } else if (!req.body.role_id) {
    res.status(400).send({
      message: "role_id dosen wali cannot be empty!",
    });
    return;
  } else if (!req.body.dosen_id) {
    res.status(400).send({
      message: "dosen_id dosen wali cannot be empty!",
    });
    return;
  } else if (!req.body.prodi_id) {
    res.status(400).send({
      message: "prodi_id dosen wali cannot be empty!",
    });
    return;
  } else if (!req.body.kelas_id) {
    res.status(400).send({
      message: "kelas_id dosen wali cannot be empty!",
    });
    return;
  } else if (!req.body.angkatan_id) {
    res.status(400).send({
      message: "angkatan_id dosen wali cannot be empty!",
    });
    return;
  }

  // Create a Dosen Wali
  const dosen_wali = {
    id_dosenwali: req.body.angkatan_id + req.body.dosen_id + req.body.kelas_id,
    username: req.body.username,
    password: req.body.password,
    role_id: req.body.role_id,
    dosen_id: req.body.dosen_id,
    prodi_id: req.body.prodi_id,
    kelas_id: req.body.kelas_id,
    angkatan_id: req.body.angkatan_id,
  };

  console.lo;

  Dosen_Wali.create(dosen_wali)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin.",
      });
    });
};

exports.findAll = (req, res) => {
  Dosen_Wali.findAll({
    include: [db.prodi, db.angkatan, db.kelas, db.dosen],
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
  const id = req.params.id;

  Dosen_Wali.update(req.body, {
    where: { id_dosenwali: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dosen Wali was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Dosen Wali with id=${id}. Maybe Dosen Wali was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Dosen Wali with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Dosen_Wali.destroy({
    where: { id_dosenwali: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dosen Wali was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dosen Wali with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Dosen Wali with id=${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Dosen_Wali.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Dosen Wali with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Dosen Wali with id=${id}`,
      });
    });
};
