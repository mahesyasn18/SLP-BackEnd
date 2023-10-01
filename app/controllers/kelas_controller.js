const db = require("../models");
const Kelas = db.kelas;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nama_kelas) {
      res.status(400).send({
        message: "nama kelas cannot be empty!"
      });
      return;
    }
  
    // Create an admin
    const kelas = {
      nama_kelas: req.body.nama_kelas,
      username: req.body.username,
      password: req.body.password,
    };
  
    Kelas.create(kelas)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Kelas."
        });
      });
};

exports.findAll = (req, res) => {
    Kelas.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Kelas."
        });
      });
};