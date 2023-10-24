const { angkatan } = require("../models");
const db = require("../models");
const Mahasiswa = db.mahasiswa;
const XLSX = require("xlsx");
const fs = require("fs");

exports.create = (req, res) => {
  // Create an mahasiswa
  const mahasiswa = {
    nim: req.body.nim,
    nama: req.body.nama,
    email: req.body.username,
    password: req.body.password,
    no_telp: req.body.no_telp,
    no_telp_orang_tua: req.body.no_telp_orang_tua,
    role_id: 2,
    prodi_id: req.body.prodi_id,
    kelas_id: req.body.kelas_id,
    angkatan_id: req.body.angkatan_id,
  };

  Mahasiswa.create(mahasiswa)
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

exports.importExcel = async (req, res) => {
  try {
    const { excel } = req.files;
    if (
      excel.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      fs.unlinkSync(excel.tempFilePath);
      return res.status(400).json({ msg: "File is invalid" });
    }

    const workbook = XLSX.readFile(excel.tempFilePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const successData = [];
    const failureData = [];

    for (let i = 0; i < data.length; i++) {
      const {
        nim,
        nama,
        username,
        password,
        no_telp,
        no_telp_orang_tua,
        walidosen_id,
        role_id,
        prodi_id,
        kelas_id,
        angkatan_id,
      } = data[i];
      const mahasiswa = {
        nim,
        nama,
        username,
        password,
        no_telp,
        no_telp_orang_tua,
        walidosen_id,
        role_id,
        prodi_id,
        kelas_id,
        angkatan_id,
      };

      try {
        const createdMahasiswa = await Mahasiswa.create(mahasiswa);
        successData.push(createdMahasiswa);
      } catch (error) {
        failureData.push({ ...mahasiswa, error: error.message });
      }
    }

    fs.unlinkSync(excel.tempFilePath);

    res.status(200).json({
      success: successData,
      failure: failureData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred" });
  }
};

exports.findAll = (req, res) => {
  Mahasiswa.findAll({
    include: [db.prodi, db.angkatan, db.kelas],
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
  const id = req.params.nim;

  Mahasiswa.update(req.body, {
    where: { nim: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mahasiswa was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Mahasiswa with id=${id}. Maybe Mahasiswa was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Mahasiswa with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Mahasiswa.destroy({
    where: { nim: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mahasiswa was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Mahasiswa with id=${id}. Maybe Mahasiswa was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Mahasiswa with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Mahasiswa with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Mahasiswa with id=" + id,
      });
    });
};

exports.findByClass = (req, res) => {
  const dosenwali_id = req.params.dosenwali_id;
  Mahasiswa.findAll({
    include: [db.prodi, db.angkatan, db.kelas],
    where: {
      walidosen_id: dosenwali_id,
    },
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
