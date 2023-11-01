const db = require("../models");
const mengajars = db.Mengajar;

exports.createMengajar = (req, res) => {
  const mengajar = {
    id_dosen: req.body.id_dosen,
    id_detail_matkul: req.body.id_detail_matkul,
    id_semester: req.body.id_semester,
    angkatan_id: req.body.id_angkatan,
    kelas_id: req.body.id_prodi,
    prodi_id: req.body.id_kelas,
  };

  mengajars
    .create(mengajar)
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
