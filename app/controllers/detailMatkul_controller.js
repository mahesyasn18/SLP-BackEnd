const db = require("../models");
const DetailMatKul = db.detailMatkul;

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
  // Create a detailMatkul without specifying id_detailMatkul
  const detailMatkul = {
    tipe: req.body.tipe,
    sks: req.body.sks,
    matkul_id: req.body.matkul_id,
    prodi_id: req.body.prodi_id,
  };

  DetailMatKul.create(detailMatkul)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the detail Matkul.",
      });
    });
};

exports.findAll = (req, res) => {
  const semester_kuliah = req.params.id; // Assuming the parameter is named semester_kuliah
  const id_prodi = req.params.id_prodi; // Assuming the parameter is named id_prodi

  DetailMatKul.findAll({
    include: [
      {
        model: db.prodi,
      },
      {
        model: db.matakuliah,
        where: { semester_matakuliah: semester_kuliah }, // Adjust this based on your actual column name in the matakuliah table
      },
    ],
    where: { prodi_id: id_prodi }, // Adjust this based on your actual column name in the prodi table
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail Matkul.",
      });
    });
};

exports.findAlls = (req, res) => {
  DetailMatKul.findAll({
    include: [
      {
        model: db.prodi,
      },
      {
        model: db.matakuliah,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail Matkul.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  DetailMatKul.update(req.body, {
    where: { id_detailMatkul: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "detail Matkul was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update detail Matkul with id=${id}. Maybe detail Matkul was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating detail Matkul with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  DetailMatKul.destroy({
    where: { id_detailMatkul: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Detail Mata Kuliah was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dosen with id=${id}. Detail Maybe Mata kuliah was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Detail Mata Kuliah with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  DetailMatKul.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Detail Matkul with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Detail Matkul with id=" + id,
      });
    });
};

exports.findID = (req, res) => {
  DetailMatKul.findAll({
    attributes: ["id_detailMatkul"], // Hanya ambil kolom id_detailMatkul
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail Matkul.",
      });
    });
};
