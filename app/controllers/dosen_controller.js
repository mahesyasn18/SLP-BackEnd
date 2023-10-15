const db = require("../models");
const Dosen = db.dosen;
const XLSX = require("xlsx");
const fs = require("fs");

exports.create = (req, res) => {
  if (!req.body.kode_dosen) {
    res.status(400).send({
      message: "kode dosen cannot be empty!",
    });
    return;
  } else if (!req.body.nama_dosen) {
    res.status(400).send({
      message: "nama cannot be empty!",
    });
    return;
  } else if (!req.body.username) {
    res.status(400).send({
      message: "username cannot be empty!",
    });
    return;
  } else if (!req.body.password) {
    res.status(400).send({
      message: "password cannot be empty!",
    });
    return;
  } else if (!req.body.email) {
    res.status(400).send({
      message: "no_telp cannot be empty!",
    });
    return;
  }

  // Create an Dosen
  const dosen = {
    kode_dosen: req.body.kode_dosen,
    nama_dosen: req.body.nama_dosen,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  Dosen.create(dosen)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin.",
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
      const { kode_dosen, nama_dosen, username, password, email } = data[i];
      const passwordString = String(password);
      const dosen = {
        kode_dosen,
        nama_dosen,
        username,
        password: passwordString,
        email,
      };

      try {
        const createdDosen = await Dosen.create(dosen);
        successData.push(createdDosen);
      } catch (error) {
        failureData.push({ ...dosen, error: error.message });
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
  Dosen.findAll()
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

  Dosen.update(req.body, {
    where: { kode_dosen: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dosen was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Dosen with id=${id}. Maybe Dosen was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Dosen with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Dosen.destroy({
    where: { kode_dosen: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dosen was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dosen with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Dosen with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Dosen.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Dosen with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Dosen with id=" + id,
      });
    });
};
