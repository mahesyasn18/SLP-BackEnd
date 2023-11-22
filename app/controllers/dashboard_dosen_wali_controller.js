const db = require("../models");
const Perizinan = db.perizinan;
const DetailMatKul = db.detailMatkul;
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const Semester = db.semester;
const Sequelize = require("sequelize");

const detailPerizinan = db.detailPerizinan;

exports.findAll = (req, res) => {
  const userId = req.userId;
  Perizinan.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.countByIdPerizinan = (req, res) => {
  const id_perizinan = req.params.id_perizinan;

  Perizinan.count({
    where: {
      status: "Menunggu Verifikasi",
    },
  })
    .then((count) => {
      res.send({ count });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while counting Perizinan by id_perizinan.",
      });
    });
};

exports.countIzinbyDosen = (req, res) => {
  const walidosen_id = req.params.walidosen_id;
  Perizinan.count({
    where: {
      jenis: "Izin", // Cocokkan dengan ID DosenWali
      status: "Menunggu Verifikasi",
    },
    include: [
      {
        model: db.mahasiswa,
        where: {
          walidosen_id: walidosen_id,
        },
      },
    ],
  })
    .then((count) => {
      res.send({ count });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.countSakitbyDosen = (req, res) => {
  const walidosen_id = req.params.walidosen_id;
  Perizinan.count({
    where: {
      jenis: "Sakit", // Cocokkan dengan ID DosenWali
      status: "Diverifikasi",
    },
    include: [
      {
        model: db.mahasiswa,
        where: {
          walidosen_id: walidosen_id,
        },
      },
    ],
  })
    .then((count) => {
      res.send({ count });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.totalPermohonanbyDosen = (req, res) => {
  const walidosen_id = req.params.walidosen_id;
  Perizinan.count({
    where: {
      // jenis: "Sakit", // Cocokkan dengan ID DosenWali
      status: "Menunggu Verifikasi",
    },
    include: [
      {
        model: db.mahasiswa,
        where: {
          walidosen_id: walidosen_id,
        },
      },
    ],
  })
    .then((count) => {
      res.send({ count });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.findAll = (req, res) => {
  const userId = req.userId;
  const walidosen_id = req.params.walidosen_id;
  Perizinan.findAll({
    // where: {

    // },
    include: [
      {
        model: Semester,
        where: {
          status_semester: 1,
        },
      },
      {
        model: db.mahasiswa,
        where: {
          walidosen_id: walidosen_id,
        },
      },
    ],
  })
    .then((data) => {
      const dashboardData = {
        jumlahSakit: 0,
        jumlahIzin: 0,
        totalPermohonan: 0,
        jumlah_sakit_perbulan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        jumlah_izin_perbulan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        nama_sakit_perhari: [],
      };
      data.forEach((item) => {
        const month = item.createdAt.getMonth();
        if (item.jenis === "Sakit" && item.status === "Diverifikasi") {
          dashboardData.jumlahSakit++;
          dashboardData.jumlah_sakit_perbulan[month]++;
          nama_sakit_perhari.push(item.nama);
        } else if (item.jenis === "Izin" && item.status === "Diverifikasi") {
          dashboardData.jumlahIzin++;
          dashboardData.jumlah_izin_perbulan[month]++;
        }
        if (item.status === "Menunggu Verifikasi") {
          dashboardData.totalPermohonan++;
        }
      });
      res.send(dashboardData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.getMahasiswaJumlahSakitIzin = (req, res) => {
  const userId = req.userId;
  const walidosen_id = req.params.walidosen_id;

  Perizinan.findAll({
    include: [
      {
        model: Semester,
        where: {
          status_semester: 1,
        },
      },
      {
        model: db.mahasiswa,
        attributes: ["nama"], // Pastikan ada kolom 'nama' di tabel mahasiswa
        where: {
          walidosen_id: walidosen_id,
        },
      },
    ],
  })
    .then((data) => {
      const mahasiswaData = [];

      data.forEach((item) => {
        if (item.mahasiswa && item.mahasiswa.nama) {
          const namaMahasiswa = item.mahasiswa.nama;
          let existingData = mahasiswaData.find(
            (data) => data.nama === namaMahasiswa
          );

          if (!existingData) {
            existingData = {
              nama: namaMahasiswa,
              jumlahSakit: 0,
              jumlahIzin: 0,
            };
            mahasiswaData.push(existingData);
          }

          if (item.jenis === "Sakit") {
            existingData.jumlahSakit++;
          } else if (item.jenis === "Izin") {
            existingData.jumlahIzin++;
          }
        }
      });
      mahasiswaData.sort((a, b) =>
        a.jumlahSakit + a.jumlahIzin > b.jumlahSakit + b.jumlahIzin ? -1 : 1
      );
      res.send(mahasiswaData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.getMahasiswaIzinSakitHariIni = (req, res) => {
  const userId = req.userId;
  const walidosen_id = req.params.walidosen_id;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam ke 00:00:00.000

  Perizinan.findAll({
    include: [
      {
        model: Semester,
        where: {
          status_semester: 1,
        },
      },
      {
        model: db.mahasiswa,
        attributes: ["nama"], // Pastikan ada kolom 'nama' di tabel mahasiswa
        where: {
          walidosen_id: walidosen_id,
        },
      },
    ],
    where: {
      [Op.and]: [
        {
          createdAt: {
            [Op.gte]: today,
          },
        },
        {
          [Op.or]: [
            {
              tanggal_awal: {
                [Op.lte]: today,
              },
              tanggal_akhir: {
                [Op.gte]: today,
              },
            },
            {
              tanggal_awal: {
                [Op.lte]: today,
              },
              tanggal_akhir: {
                [Op.eq]: null,
              },
            },
          ],
        },
      ],
    },
  })
    .then((data) => {
      const mahasiswaData = [];
      let totalPermohonanMenunggu = 0;

      data.forEach((item) => {
        if (item.mahasiswa && item.mahasiswa.nama) {
          const namaMahasiswa = item.mahasiswa.nama;
          let existingData = mahasiswaData.find(
            (data) => data.nama === namaMahasiswa
          );

          if (!existingData && item.status === "Diverifikasi") {
            existingData = {
              nama: namaMahasiswa,
              jenis: item.jenis,
            };
            mahasiswaData.push(existingData);
          }

          // if (
          // 	(item.jenis === "Sakit" || item.jenis === "Izin") &&
          // 	item.status === "Diverifikasi"
          // ) {
          // 	existingData[item.jenis.toLowerCase()] = true;
          // }

          if (
            (item.jenis === "Sakit" || item.jenis === "Izin") &&
            item.status === "Menunggu Verifikasi"
          ) {
            totalPermohonanMenunggu++;
          }
        }
      });

      res.send({ mahasiswaData, totalPermohonanMenunggu });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.get_Matkul = (req, res) => {
  const userId = req.userId;
  const walidosen_id = req.params.walidosen_id;

  detailPerizinan
    .findAll({
      include: [
        {
          model: db.perizinan,
          include: [
            {
              model: db.semester,
              where: { status_semester: 1 },
            },
            {
              model: db.mahasiswa,
              where: {
                walidosen_id: walidosen_id,
              },
            },
          ],
        },
        {
          model: db.AngkatanMatkul,
          include: [
            {
              model: db.detailMatkul,
              include: [{ model: db.matakuliah }],
            },
          ],
        },
      ],
    })
    .then((data) => {
      const graf = {};

      data.forEach((item) => {
        const id_detail_matkul = item.angkatan_detail_matkul.id_detail_matkul;

        if (
          item.perizinan !== null &&
          id_detail_matkul !== null &&
          item.perizinan.status === "Diverifikasi"
        ) {
          const id_mata_kuliah =
            item.angkatan_detail_matkul.detailMatkul.matkul_id; // Assuming id_matkul is the correct field
          const nama_matkul =
            item.angkatan_detail_matkul.detailMatkul.mataKuliah.nama_matakuliah;

          // Initialize properties if not present in graf
          if (!graf[id_mata_kuliah]) {
            graf[id_mata_kuliah] = {
              id_mata_kuliah,
              nama_matkul,
              jumlah_sakit: 0,
              jumlah_izin: 0,
            };
          }

          // Update counts based on perizinan jenis
          if (item.perizinan.jenis === "Sakit") {
            graf[id_mata_kuliah].jumlah_sakit++;
          } else if (item.perizinan.jenis === "Izin") {
            graf[id_mata_kuliah].jumlah_izin++;
          }
        }
      });

      // Convert graf object to an array of values
      const grafArray = Object.values(graf);

      res.send(graf);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
