const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.create = (req, res) => {
    if (!req.body.nim) {
      res.status(400).send({
        message: "nim cannot be empty!"
      });
      return;
    }else if(!req.body.nama){
        res.status(400).send({
            message: "nama cannot be empty!"
          });
        return;
    }else if(!req.body.username){
        res.status(400).send({
            message: "username cannot be empty!"
          });
        return;
    }else if(!req.body.password){
        res.status(400).send({
            message: "password cannot be empty!"
          });
        return;
    }else if(!req.body.no_telp){
        res.status(400).send({
            message: "no_telp cannot be empty!"
          });
        return;
    }else if(!req.body.no_telp_orang_tua){
        res.status(400).send({
            message: "no_telp_orang_tua cannot be empty!"
          });
        return;
    }else if(!req.body.prodiId){
        res.status(400).send({
            message: "prodiId cannot be empty!"
          });
        return;
    }else if(!req.body.kelasId){
        res.status(400).send({
            message: "kelasId cannot be empty!"
          });
        return;
    }
  
    // Create an mahasiswa
    const mahasiswa = {
        nim: req.body.nim,
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        no_telp: req.body.no_telp,
        no_telp_orang_tua: req.body.no_telp_orang_tua,
        roleId: 2,
        prodiId: req.body.prodiId,
        kelasId: req.body.kelasId,
    };
  
    Mahasiswa.create(mahasiswa)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Admin."
        });
      });
};

exports.findAll = (req, res) => {
    Mahasiswa.findAll()
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