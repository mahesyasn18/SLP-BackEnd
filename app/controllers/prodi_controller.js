const db = require("../models");
const Prodi = db.prodi;

exports.findAll = (req, res) => {
  Prodi.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Prodi.",
      });
    });
};
