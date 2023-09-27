const db = require("../models");
const Admin = db.admin;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nama) {
      res.status(400).send({
        message: "nama can not be empty!"
      });
      return;
    }else if(!req.body.username){
        res.status(400).send({
            message: "username can not be empty!"
          });
        return;
    }else if(!req.body.password){
        res.status(400).send({
            message: "password can not be empty!"
          });
        return;
    }
  
    // Create an admin
    const admin = {
      nama: req.body.nama,
      username: req.body.username,
      password: req.body.password,
    };
  
    Admin.create(admin)
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
    Admin.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Admin."
        });
      });
};