const db = require("../models");
const Matkul = db.matakuliah;

exports.create = (req, res) => {
  if (!req.body.tipe) {
    res.status(400).send({
      message: "tipe mata kuliah cannot be empty!",
    });
    return;
  }
  if (!req.body.sks) {
    res.status(400).send({
      message: "sks cannot be empty!",
    });
    return;
  }
  if (!req.body.id_Matkul) {
    res.status(400).send({
      message: "Id cannot be empty!",
    });
    return;
  }

  // Create an admin
  const Matkul = {
    id_Matkul: req.body.id_Matkul,
    nama_Matkul: req.body.nama_Matkul,
  };

  Matkul.create(Matkul)
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
  const id = req.params.id_Matkul;

  Matkul.update(req.body, {
    where: { id_Matkul: id },
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
  const id = req.params.id_Matkul;

  Matkul.destroy({
    where: { id_Matkul: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " Matkul was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete  Matkul with id=${id}. Maybe  Matkul was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not  Matkul with id Mata kuliah=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id_Matkul;

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
