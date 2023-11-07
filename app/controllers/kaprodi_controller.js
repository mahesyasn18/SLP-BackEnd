const db = require("../models");
const Kaprodi = db.Kaprodi;

exports.create = (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.role_id ||
    !req.body.dosen_id ||
    !req.body.prodi_id
  ) {
    res.status(400).send({
      message: "Please provide all the required fields.",
    });
    return;
  }

  const kaprodi = {
    id_kaprodi: "kap-" + req.body.dosen_id + req.body.prodi_id,
    username: req.body.username,
    password: req.body.password,
    role_id: req.body.role_id,
    dosen_id: req.body.dosen_id,
    prodi_id: req.body.prodi_id,
  };

  // First, create the Kaprodi
  Kaprodi.create(kaprodi)
    .then(() => {
      res.send("Kaprodi created and Mahasiswa fields updated successfully.");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Kaprodi and updating Mahasiswa fields.",
      });
    });
};

exports.findAll = (req, res) => {
  Kaprodi.findAll({
    include: [db.prodi, db.dosen],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin.",
      });
    });
};
