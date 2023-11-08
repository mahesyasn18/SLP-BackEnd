const db = require("../models");
const mengajars = db.Mengajar;

exports.createMengajar = (req, res) => {
  const id_detail_matkul = req.body.id_detail_matkul;
  const id_semester = req.body.id_semester;
  const angkatan_id = req.body.id_angkatan;
  const kelas_id = req.body.id_prodi;
  const prodi_id = req.body.id_kelas;
  const id_dosenArray = req.body.id_dosen;

  const promises = [];

  // Create a promise for each id_dosen
  id_dosenArray.forEach((id_dosen) => {
    const mengajar = {
      id_dosen,
      id_detail_matkul,
      id_semester,
      angkatan_id,
      kelas_id,
      prodi_id,
    };

    promises.push(mengajars.create(mengajar));
  });

  // Execute all promises in parallel
  Promise.all(promises)
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

exports.findAllMengajar = (req, res) => {
  db.Mengajar.findAll({
    include: [
      { model: db.dosen },
      { model: db.prodi },
      { model: db.kelas },
      { model: db.detailMatkul, include: db.matakuliah },
      { model: db.angkatan },
      { model: db.semester },
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
