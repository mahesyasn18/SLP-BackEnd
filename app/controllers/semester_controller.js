const db = require("../models");
const Semester = db.semester;
const { Op } = require("sequelize");

exports.create = (req, res) => {
  const semester = {
    id_semester: req.body.id_semester,
    nama_semester: req.body.nama_semester,
    status_semester: 0,
  };

  if (!req.body.id_semester) {
    res.status(400).send({
      message: "id_semester cannot be empty!",
    });
    return;
  } else if (!req.body.nama_semester) {
    res.status(400).send({
      message: "nama_semester cannot be empty!",
    });
    return;
  }

  Semester.create(semester)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating Perizinan",
      });
    });
};

exports.findAll = (req, res) => {
  Semester.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Semester.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { status_semester } = req.body;

  if (status_semester === 1) {
    // Jika status semester yang diaktifkan adalah 1, maka nonaktifkan semester yang lain
    Semester.update(
      { status_semester: 0 },
      {
        where: {
          id_semester: {
            [Op.not]: id, // Memastikan id semester yang diaktifkan tidak diubah statusnya
          },
        },
      }
    )
      .then((num) => {
        console.log(`Deactivated ${num} semesters`);
      })
      .catch((err) => {
        console.error("Error deactivating semesters:", err);
      });
  }

  // Mengupdate status semester yang dipilih
  Semester.update(
    { status_semester },
    {
      where: { id_semester: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Semester with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Semester.destroy({
    where: { id_semester: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Perizinan with id=${id}. Maybe Semester was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Semester with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Semester.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Semester with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Semester with id=" + id,
      });
    });
};

exports.findActive = (req, res) => {
  Semester.findAll({ where: { status_semester: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Semester.",
      });
    });
};
