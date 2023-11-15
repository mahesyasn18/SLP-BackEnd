const db = require("../models");
const Angkatan = db.angkatan;
const angkatandetailMatkul = db.AngkatanMatkul;

exports.findAll = (req, res) => {
  Angkatan.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Angkatan.",
      });
    });
};

exports.createAngkatanMatkul = (req, res) => {
  // Create an AngkatanMatkul
  const angkatanMatkul = {
    id_angkatan: req.body.angkatan_id,
    id_detail_matkul: req.body.id_detailMatkul,
    id_semester: req.body.id_semester,
    id_prodi: req.body.prodi_id,
    id_kelas: req.body.kelas_id,
  };

  angkatandetailMatkul
    .create(angkatanMatkul)
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

exports.findAllAngkatanMatkul = (req, res) => {
  db.AngkatanMatkul.findAll({
    include: [
      { model: db.semester },
      { model: db.prodi },
      { model: db.kelas },
      { model: db.detailMatkul, include: db.matakuliah },
      { model: db.angkatan },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving AngkatanMatkul.",
      });
    });
};

exports.findAllAngkatanMatkulperMahasiswa = (req, res) => {
  const id_semester = req.params.id_semester;
  const id_prodi = req.params.id_prodi;
  const id_kelas = req.params.id_kelas;
  const id_angkatan = req.params.id_angkatan;

  db.AngkatanMatkul.findAll({
    where: {
      id_semester: id_semester,
      id_prodi: id_prodi,
      id_kelas: id_kelas,
      id_angkatan: id_angkatan,
    },
    include: [{ model: db.detailMatkul, include: db.matakuliah }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving AngkatanMatkul.",
      });
    });
};

exports.findAllAngkatanMatkulperMahasiswaSelected = (req, res) => {
  const angkatanMatkul_id = req.params.angkatanMatkul_id;

  db.AngkatanMatkul.findAll({
    where: {
      angkatanMatkul_id: angkatanMatkul_id,
    },
    include: [{ model: db.detailMatkul, include: db.matakuliah }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving AngkatanMatkul.",
      });
    });
};
