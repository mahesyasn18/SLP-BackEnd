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
  if (!req.body.id_detailMatkul) {
    res.status(400).send({
      message: "Id cannot be empty!",
    });
    return;
  }

  // Create an admin
  const detailMatkul = {
    id_detailMatkul: req.body.id_detailMatkul,
    tipe: req.body.tipe,
    sks: req.body.sks,
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
  DetailMatKul.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};
