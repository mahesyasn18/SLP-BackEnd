const db = require("../models");
const Perizinan = db.perizinan;
const nodemailer = require("nodemailer");
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
    to: "", // You need to set the recipient email dynamically in each iteration
    subject: "", // You need to set the subject dynamically in each iteration
    html: "", // You need to set the HTML content dynamically in each iteration
  };

  // if (req.body.status == "Diverifikasi") {
  //   for (const mengajar of datamengajar) {
  //     console.log("Data Mengajar:", mengajar.toJSON());

  //     // Update message content dynamically based on mengajar and dataperizinan values
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
  //       Authorization: "6n#2#qRDDMMeU6hU31VW",
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
  //   async function sendFonnte(data) {
  //     const url = "https://api.fonnte.com/send";

  //     const customHeaders = {
  //       "Content-Type": "application/json",
  //       Authorization: "6n#2#qRDDMMeU6hU31VW",
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
  //       "\nData Perizinanmu Ditolak Oleh Wali Dosen!" +
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
  //       "\nKeterangan Walidosen: " +
  //       " masi kosong nunggu opic" +
  //       "\n\n\nStudent Leaving Permission | JTK 2BD3",
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
  //       " Ditolak Oleh Wali Dosen!" +
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
  //       "\nKeterangan Walidosen: " +
  //       " masi kosong nunggu opic" +
  //       "\n\n\nStudent Leaving Permission | JTK 2BD3",
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
      jenis: "Sakit", // Cocokkan dengan ID DosenWali
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
