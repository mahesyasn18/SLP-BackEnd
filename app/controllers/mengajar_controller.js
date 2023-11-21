const db = require("../models");
const mengajars = db.Mengajar;
const Dosen = db.dosen;

exports.createMengajar = (req, res) => {
  const id_matkulmengajar = req.body.id_detail_matkul;
  const id_dosenArray = req.body.id_dosen;

  const promises = [];

  // Create a promise for each id_dosen

  id_dosenArray.forEach((id_dosen) => {
    const mengajar = {
      id_dosen,
      id_matkulmengajar,
    };

    promises.push(mengajars.create(mengajar));
  });

  // Execute all promises in parallel
  Promise.all(promises)
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

exports.findAllMengajar = (req, res) => {
  db.Mengajar.findAll({
    include: [
      { model: db.dosen },
      {
        model: db.AngkatanMatkul,
        include: [
          {
            model: db.angkatan,
          },
          {
            model: db.prodi,
          },
          {
            model: db.kelas,
          },
          {
            model: db.semester,
            where: { status_semester: 1 }, // Menambahkan kondisi status_semester
          },
          {
            model: db.detailMatkul,
            include: [
              {
                model: db.matakuliah,
              },
            ],
          },
        ],
      },
    ],
  })
    .then((data) => {
      // Filter data yang memiliki status_semester: 1
      const filteredData = data.filter(
        (item) => item?.angkatan_detail_matkul?.semester?.status_semester === 1
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
