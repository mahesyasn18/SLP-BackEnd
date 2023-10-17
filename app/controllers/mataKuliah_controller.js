const db = require("../models");
const Matkul = db.matakuliah;

exports.create = (req, res) => {
  if (!req.body.nama_matakuliah) {
    res.status(400).send({
      message: "nama mata kuliah cannot be empty!",
    });
    return;
  }
  if (!req.body.id_matakuliah) {
    res.status(400).send({
      message: "Id cannot be empty!",
    });
    return;
  }

  // Create an admin
  const matkul = {
    id_matakuliah: req.body.id_matakuliah,
    nama_matakuliah: req.body.nama_matakuliah,
  };

  Matkul.create(matkul)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the  Matkul.",
      });
    });
};

exports.findAll = (req, res) => {
  Matkul.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving  Matkul.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Matkul.update(req.body, {
    where: { id_matakuliah: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " Matkul was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update  Matkul with id=${id}. Maybe detai lMatkul was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating  Matkul with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Matkul.destroy({
    where: { id_matakuliah: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mata Kuliah was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dosen with id=${id}. Maybe Mata kuliah was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Mata Kuliah with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Matkul.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  Matkul with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving  Matkul with id=" + id,
      });
    });
};
