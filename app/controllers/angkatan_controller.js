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
      const filteredData = data.filter(
        (item) => item?.semester?.status_semester === 1
      );
      res.send(filteredData);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving AngkatanMatkul.",
      });
    });
};

exports.findAllAngkatanMatkulperClass = (req, res) => {
  const tahun_angkatan = req.params.angkatan;
  const nama_kelas = req.params.kelas;
  const id_prodi = req.params.id_prodi;
  db.AngkatanMatkul.findAll({
    include: [
      { model: db.semester },
      {
        model: db.prodi,
        where: {
          id_prodi: id_prodi,
        },
      },
      {
        model: db.kelas,
        where: {
          nama_kelas: nama_kelas,
        },
      },
      { model: db.detailMatkul, include: db.matakuliah },
      {
        model: db.angkatan,
        where: {
          tahun_angkatan: tahun_angkatan,
        },
      },
    ],
  })
    .then((data) => {
      const filteredData = data.filter(
        (item) => item?.semester?.status_semester === 1
      );
      res.send(filteredData);
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

exports.findAllAngkatanMatkulKelas = (req, res) => {
  const id_prodi = req.params.id;
  db.AngkatanMatkul.findAll({
    include: [
      { model: db.semester },
      {
        model: db.prodi,
        attributes: [],
        where: {
          id_prodi: id_prodi,
        },
      },
      { model: db.kelas, attributes: ["nama_kelas"] },
      {
        model: db.detailMatkul,
        include: { model: db.matakuliah, attributes: [] },
        attributes: [],
      },
      { model: db.angkatan, attributes: ["tahun_angkatan"] },
    ],
  })
    .then((data) => {
      console.log("Original Data:", data);

      const filteredData = data.filter(
        (item) => item?.semester?.dataValues?.status_semester === 1
      );

      console.log("Filtered Data:", filteredData);

      const result = filteredData.map((item) => ({
        nama_kelas: item.kela?.nama_kelas,
        tahun_angkatan: item.angkatan?.tahun_angkatan,
      }));

      console.log("Result:", result);

      // If you want to get distinct values based on nama_kelas and tahun_angkatan
      const distinctResult = Array.from(
        new Set(result.map((item) => JSON.stringify(item)))
      ).map((item) => JSON.parse(item));

      res.send(distinctResult);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving AngkatanMatkul.",
      });
    });
};
