const db = require("../models");
const Perizinan = db.perizinan;
const DetailMatKul = db.detailMatkul;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // The folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid conflicts
  },
});

const upload = multer({ storage });

exports.create = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(500).send({
        message: "File upload failed: " + err.message,
      });
    }

    const filePath = path.join(req.file.filename);

    const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
    const idss = req.body.nim + random4DigitNumber;
    let jml_jam = 0;
    const matkulData = req.body.matakuliah;

    if (!matkulData || matkulData.length === 0) {
      return res.status(400).send({
        message: "At least one course must be selected.",
      });
    }

    // Pisahkan ID menjadi array menggunakan koma sebagai pemisah
    const matkulIDs = matkulData.split(",");
    // Inisialisasi array untuk menyimpan hasil
    let promises = [];

    // Loop melalui setiap ID
    matkulIDs.forEach((id) => {
      const promise = DetailMatKul.findAll({
        where: {
          id_detailMatkul: id,
        },
      });
      promises.push(promise);
    });

    // Gunakan Promise.all untuk menunggu semua promise selesai
    Promise.all(promises)
      .then((results) => {
        const flattenedResults = [].concat(...results); // Flatten the array of arrays
        const sks = flattenedResults.map((result) => result.dataValues.sks);
        const tipe = flattenedResults.map((result) => result.dataValues.tipe);

        const perizinanDetails = []; // Inisialisasi array untuk menyimpan data perizinanDetail

        for (let i = 0; i < matkulIDs.length; i++) {
          const id_detail_matkul = matkulIDs[i];
          const sksValue = sks[i];
          const tipeValue = tipe[i];

          let jml_jam;

          if (tipeValue === "Teori") {
            jml_jam = parseInt(sksValue);
          } else {
            jml_jam = parseInt(sksValue) * 3;
          }

          const perizinanDetail = {
            jumlah_jam: jml_jam,
            perizinan_id: idss,
            id_detail_matkul: id_detail_matkul,
          };

          perizinanDetails.push(perizinanDetail);
        }
        const perizinan = {
          id_perizinan: idss,
          surat: filePath,
          jenis: req.body.jenis,
          status: req.body.status,
          keterangan: req.body.keterangan,
          tanggal_awal: req.body.tanggal_awal,
          tanggal_akhir: req.body.tanggal_akhir,
          nim: req.body.nim,
          detailPerizinan: [perizinanDetails],
          id_semester: req.body.id_semester,
        };
        if (!perizinan.id_perizinan) {
          res.status(400).send({
            message: "id_Perizinan cannot be empty!",
          });
        } else if (!perizinan.surat) {
          res.status(400).send({
            message: "surat cannot be empty!",
          });
        } else if (!perizinan.jenis) {
          res.status(400).send({
            message: "jenis cannot be empty!",
          });
        } else if (!perizinan.status) {
          res.status(400).send({
            message: "status cannot be empty!",
          });
        } else if (!perizinan.keterangan) {
          res.status(400).send({
            message: "keterangan cannot be empty!",
          });
        } else if (!perizinan.tanggal_awal) {
          res.status(400).send({
            message: "tanggal_awal cannot be empty!",
          });
        } else if (!perizinan.tanggal_akhir) {
          res.status(400).send({
            message: "tanggal_akhir cannot be empty!",
          });
        }
        Perizinan.create(perizinan, { include: ["detailPerizinan"] })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Admin.",
            });
          });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });
};

exports.findAll = (req, res) => {
  const userId = req.userId;
  Perizinan.findAll({
    where: { nim: userId },
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
  const id = req.params.id;

  Perizinan.update(req.body, {
    where: { id_perizinan: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Perizinan was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Perizinan with id=${id}. Maybe Perizinan was not found or req.body is empty!`,
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

  Perizinan.destroy({
    where: { id_perizinan: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Perizinan was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Perizinan with id=${id}. Maybe Perizinan was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Perizinan with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Perizinan.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Perizinan with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Perizinan with id=" + id,
      });
    });
};
