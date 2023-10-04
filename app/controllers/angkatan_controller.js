const db = require("../models");
const Angkatan = db.angkatan;

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
