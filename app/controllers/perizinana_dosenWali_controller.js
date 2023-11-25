const db = require("../models");
const Perizinan = db.perizinan;
const Mahasiswa = db.mahasiswa;
const detailPerizinan = db.detailPerizinan;
const nodemailer = require("nodemailer");
const { Op, Sequelize, fn } = require("sequelize");
const { EMAIL, PASSWORD } = require("../../env.js");

exports.findAll = (req, res) => {
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

exports.findAllbyDosen = (req, res) => {
  const walidosen_id = req.params.walidosen_id;
  Perizinan.findAll({
    include: [
      {
        model: db.mahasiswa,
        where: {
          walidosen_id: walidosen_id,
        },
      },
      {
        model: db.detailPerizinan,
      },
    ],
    where: {
      status: {
        [Op.not]: "Draft",
      },
    },
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

exports.findAllbyMhs = (req, res) => {
  const walidosen_id = req.params.walidosen_id;

  Perizinan.findAll({
    include: [
      {
        model: Mahasiswa,
        where: {
          walidosen_id: walidosen_id,
        },
        attributes: ["nim", "nama"],
      },
      {
        model: detailPerizinan,
        attributes: ["jumlah_jam"],
      },
    ],
    where: {
      status: {
        [Op.not]: "Draft",
      },
    },
    attributes: [
      "mahasiswa.nim",
      "mahasiswa.nama",
      "perizinan.id_perizinan",
      "detailPerizinans.id_perizinan", // Include this line if necessary
    ],
    group: [
      "mahasiswa.nim",
      "mahasiswa.nama",
      // Include this line if necessary
    ],
  })
    .then((data) => {
      // Process the result to calculate totalJam
      const formattedData = data.map((item) => ({
        mahasiswa: {
          nim: item.mahasiswa.nim,
          nama: item.mahasiswa.nama,
        },
      }));

      // Calculate totalJam separately
      const promises = formattedData.map((item) =>
        detailPerizinan
          .findAll({
            where: {
              id_perizinan: item.mahasiswa.id_perizinan, // Adjust the field name as needed
            },
            attributes: [
              [Sequelize.fn("SUM", Sequelize.col("jumlah_jam")), "totalJam"],
            ],
          })
          .then((result) => {
            item.totalJam = result[0].dataValues.totalJam || 0;
          })
      );

      Promise.all(promises).then(() => {
        res.send(formattedData);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
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
        message: "Error retrieving Mahasiswa with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const dataperizinan = await Perizinan.findOne({
    where: { id_perizinan: id },
    include: [
      { model: db.detailPerizinan },
      { model: db.mahasiswa },
      // Add more models if needed
    ],
  });

  console.log("data perizinan", dataperizinan.toJSON());
  const idPerizinanArray = dataperizinan.detailPerizinans.map(
    (detail) => detail.id_detail_matkul
  );

  const datamengajar = await db.Mengajar.findAll({
    where: { id_matkulmengajar: idPerizinanArray },
    include: [
      { model: db.dosen },
      {
        model: db.AngkatanMatkul,
        include: [
          {
            model: db.detailMatkul,
            include: [
              { model: db.matakuliah },
              // Add more models if needed
            ],
          },
        ],
      },
      // Add more models if needed
    ],
  });

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: EMAIL,
    to: "",
    subject: "",
    html: "",
  };

  // if (req.body.status == "Diverifikasi") {
  //   for (const mengajar of datamengajar) {
  //     console.log("Data Mengajar:", mengajar.toJSON());
  //     message.to = mengajar.dosen.email;
  //     message.subject =
  //       "Pemberitahuan Perizinan " +
  //       dataperizinan.jenis +
  //       " Baru dari Mahasiswa";
  //     message.html = `
  //     <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  //     <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  //       <h2 style="color: #333;">Pemberitahuan Perizinan ${dataperizinan.jenis} Baru</h2>
  //       <p style="margin-bottom: 15px;">Halo ${mengajar.dosen.nama_dosen},</p>
  //       <p style="margin-bottom: 15px;">Terdapat Mahasiswa  ${dataperizinan.jenis} baru dari mahasiswa:</p>
  //       <p style="margin-bottom: 15px; font-weight: bold;">Nama Mahasiswa: ${dataperizinan.mahasiswa.nama}</p>
  //       <p style="margin-bottom: 15px; font-weight: bold;">NIM: ${dataperizinan.mahasiswa.nim}</p>
  //       <p style="margin-bottom: 15px; font-weight: bold;">Matakuliah: ${mengajar.angkatan_detail_matkul.detailMatkul.mataKuliah.nama_matakuliah}</p>
  //       <p style="margin-bottom: 15px; font-weight: bold;">Alasan: ${dataperizinan.keterangan}</p>

  //       <p style="margin-top: 20px;">Terima kasih,</p>
  //       <p style="font-weight: bold;">Student Leaving Permission</p>
  //     </div>
  //   </div>
  //     `;

  //     // Send the email inside the loop if needed
  //     transporter.sendMail(message, (error, info) => {
  //       if (error) {
  //         return console.log(error);
  //       }
  //       console.log("Message sent: %s", info.messageId);
  //     });
  //   }

  //   let no_telp_ortu = dataperizinan.mahasiswa.no_telp_orang_tua;
  //   let no_telp_mhs = dataperizinan.mahasiswa.no_telp;
  //   let nama_mhs = dataperizinan.mahasiswa.nama;
  //   let id_perizinan = dataperizinan.id_perizinan;
  //   let jenis = dataperizinan.jenis;
  //   let tanggal_awal = dataperizinan.tanggal_awal;
  //   let tanggal_akhir = dataperizinan.tanggal_akhir;
  //   async function sendFonnte(data) {
  //     const url = "https://api.fonnte.com/send";

  //     const customHeaders = {
  //       "Content-Type": "application/json",
  //       Authorization: "3m2C@EGb1xj5d0N2Iqis",
  //     };

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: customHeaders,
  //       body: JSON.stringify(data),
  //     });
  //     console.log(await response.json());
  //   }
  //   const datamhs = {
  //     target: no_telp_mhs,
  //     message:
  //       "Hai " +
  //       nama_mhs +
  //       "\nData Perizinanmu sudah dikonfirmasi!" +
  //       "\n" +
  //       "\n" +
  //       "ID Perizinan :" +
  //       id_perizinan +
  //       "\nJenis Perizinan :" +
  //       jenis +
  //       "\nTanggal Awal Perizinan :" +
  //       tanggal_awal +
  //       "\nTanggal Akhir Perizinan :" +
  //       tanggal_akhir +
  //       "\nStudent Leaving Permission | JTK 2BD3",
  //   };
  //   sendFonnte(datamhs);
  //   console.log(datamhs);

  //   const dataORTU = {
  //     target: no_telp_ortu,
  //     message:
  //       "Hai Orang Tua dari " +
  //       nama_mhs +
  //       "\nData Perizinan Ananda " +
  //       nama_mhs +
  //       " sudah dikonfirmasi!" +
  //       "\n" +
  //       "\n" +
  //       "ID Perizinan :" +
  //       id_perizinan +
  //       "\nJenis Perizinan :" +
  //       jenis +
  //       "\nTanggal Awal Perizinan :" +
  //       tanggal_awal +
  //       "\nTanggal Akhir Perizinan :" +
  //       tanggal_akhir +
  //       "\n\n\nStudent Leaving Permission | JTK 2BD3",
  //   };
  //   sendFonnte(dataORTU);
  //   console.log(datamhs);
  // } else {
  //   let no_telp_ortu = dataperizinan.mahasiswa.no_telp_orang_tua;
  //   let no_telp_mhs = dataperizinan.mahasiswa.no_telp;
  //   let nama_mhs = dataperizinan.mahasiswa.nama;
  //   let id_perizinan = dataperizinan.id_perizinan;
  //   let jenis = dataperizinan.jenis;
  //   let tanggal_awal = dataperizinan.tanggal_awal;
  //   let tanggal_akhir = dataperizinan.tanggal_akhir;
  //   let keterangan_dosen = dataperizinan.keterangan_dosen;
  //   async function sendFonnte(data) {
  //     const url = "https://api.fonnte.com/send";

  //     const customHeaders = {
  //       "Content-Type": "application/json",
  //       Authorization: "3m2C@EGb1xj5d0N2Iqis",
  //     };

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: customHeaders,
  //       body: JSON.stringify(data),
  //     });
  //     console.log(await response.json());
  //   }
  //   const datamhs = {
  //     target: no_telp_mhs,
  //     message:
  //       "Hai " +
  //         nama_mhs +
  //         "\nData Perizinanmu Ditolak Oleh Wali Dosen!" +
  //         "\n" +
  //         "\n" +
  //         "ID Perizinan :" +
  //         id_perizinan +
  //         "\nJenis Perizinan :" +
  //         jenis +
  //         "\nTanggal Awal Perizinan :" +
  //         tanggal_awal +
  //         "\nTanggal Akhir Perizinan :" +
  //         tanggal_akhir +
  //         "\nKeterangan Walidosen: " +
  //         " " +
  //         req.body.keterangan_dosen ??
  //       "-" + "\n\n\nStudent Leaving Permission | JTK 2BD3",
  //   };
  //   sendFonnte(datamhs);
  //   console.log(datamhs);

  //   const dataORTU = {
  //     target: no_telp_ortu,
  //     message:
  //       "Hai Orang Tua dari " +
  //         nama_mhs +
  //         "\nData Perizinan Ananda " +
  //         nama_mhs +
  //         " Ditolak Oleh Wali Dosen!" +
  //         "\n" +
  //         "\n" +
  //         "ID Perizinan :" +
  //         id_perizinan +
  //         "\nJenis Perizinan :" +
  //         jenis +
  //         "\nTanggal Awal Perizinan :" +
  //         tanggal_awal +
  //         "\nTanggal Akhir Perizinan :" +
  //         tanggal_akhir +
  //         "\nKeterangan Walidosen: " +
  //         "" +
  //         req.body.keterangan_dosen ??
  //       "-" + "\n\n\nStudent Leaving Permission | JTK 2BD3",
  //   };
  //   sendFonnte(dataORTU);
  //   console.log(datamhs);
  // }

  Perizinan.update(req.body, {
    where: { id_perizinan: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Perizinan was approved successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Perizinan with id=${id}. Maybe Perizinan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Perizinan with id=" + id,
      });
    });
};

exports.findIzin = (req, res) => {
  const walidosen_id = req.params.walidosen_id;
  Perizinan.findAll({
    where: {
      jenis: "Izin",
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.findIzinbyDosen = (req, res) => {
  const walidosen_id = req.params.walidosen_id;
  Perizinan.findAll({
    where: {
      jenis: "Izin",
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kelas.",
      });
    });
};

exports.findSakits = (req, res) => {
  Perizinan.findAll({
    where: {
      jenis: "Sakit",
      status: "Menunggu Verifikasi",
    },
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

exports.findSakit = (req, res) => {
  const walidosen_id = req.params.walidosen_id;
  Perizinan.findAll({
    where: {
      jenis: "Sakit",
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
    .then((data) => {
      res.send(data);
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
          model: db.detailMatkul,
          include: [{ model: db.matakuliah }],
        },
      ],
    })
    .then((data) => {
      const graf = {};

      data.forEach((item) => {
        const id_detail_matkul = item.id_detail_matkul;

        if (
          item.perizinan !== null &&
          id_detail_matkul !== null &&
          item.perizinan.status === "Diverifikasi"
        ) {
          const id_mata_kuliah = item.id_detail_matkul;
          const nama_matkul = item.detailMatkul.mataKuliah.nama_matakuliah;

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

      res.send(grafArray);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
