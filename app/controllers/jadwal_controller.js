const db = require("../models");
const Jadwal = db.jadwal;

exports.create = (req, res) => {
  // Create an Jadwal Mata kuliah
  const jadwal = {
    id_jadwal: req.body.id_jadwal,
    hari: req.body.hari,
    semester_id: req.body.semester_id,
    detailMatkul_id: req.body.detailMatkul_id,
    kelas_id: req.body.kelas_id,
  };

  Jadwal.create(jadwal)
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
  Jadwal.findAll()
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

  Jadwal.update(req.body, {
    where: { id_jadwal: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Jadwal Mata kuliah was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Jadwal Mata kuliah with id=${id}. Maybe Jadwal Mata kuliah was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Jadwal Mata kuliah with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Jadwal.destroy({
    where: { id_jadwal: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Jadwal Mata kuliah was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Jadwal Mata kuliah with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Jadwal Mata kuliah with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Jadwal.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Jadwal Mata kuliah with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Jadwal Mata kuliah with id=" + id,
      });
    });
};
