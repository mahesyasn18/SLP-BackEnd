const { angkatan } = require("../models");
const db = require("../models");
const Mahasiswa = db.mahasiswa;
const XLSX = require("xlsx");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../../env.js");

exports.create = async (req, res) => {
  // Create an mahasiswa
  const mahasiswa = {
    nim: req.body.nim,
    nama: req.body.nama,
    email: req.body.username,
    password: req.body.password,
    no_telp: req.body.no_telp,
    no_telp_orang_tua: req.body.no_telp_orang_tua,
    role_id: 2,
    prodi_id: req.body.prodi_id,
    kelas_id: req.body.kelas_id,
    angkatan_id: req.body.angkatan_id,
  };

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
    to: req.body.username,
    subject: "Account Access to Student Leaving Permission",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 18px; color: #333;">Hello ${req.body.nama},</p>
        <p style="font-size: 16px; color: #555;">Here are your account Access:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd;">Username</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Password</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${req.body.nim}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${req.body.password}</td>
          </tr>
        </table>
        <p style="font-size: 16px; color: #555; margin-top: 15px;">Use the provided credentials to sign in and access your account.</p>
        <p style="font-size: 16px; color: #555;">Best regards,</p>
        <p style="font-size: 16px; color: #555;">Student Leaving Permission | Jurusan Teknik Komputer dan Informatika</p>
      </div>
    `,
  };

  Mahasiswa.create(mahasiswa)
    .then((data) => {
      // Send email
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      });

      // Send response to the client
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Mahasiswa.",
      });
    });
};

exports.importExcel = async (req, res) => {
  try {
    const { excel } = req.files;
    if (
      excel.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      fs.unlinkSync(excel.tempFilePath);
      return res.status(400).json({ msg: "File is invalid" });
    }

    const workbook = XLSX.readFile(excel.tempFilePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const successData = [];
    const failureData = [];

    // Create a reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    for (let i = 0; i < data.length; i++) {
      const {
        nim,
        nama,
        email,
        password,
        no_telp,
        no_telp_orang_tua,
        walidosen_id,
        role_id,
        prodi_id,
        kelas_id,
        angkatan_id,
      } = data[i];
      const mahasiswa = {
        nim,
        nama,
        email,
        password,
        no_telp,
        no_telp_orang_tua,
        walidosen_id,
        role_id,
        prodi_id,
        kelas_id,
        angkatan_id,
      };

      try {
        const createdMahasiswa = await Mahasiswa.create(mahasiswa);

        // Send email for each successfully created Mahasiswa
        let message = {
          from: EMAIL,
          to: email,
          subject: "Account Access to Student Leaving Permission",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <p style="font-size: 18px; color: #333;">Hello ${nama},</p>
              <p style="font-size: 16px; color: #555;">Here are your account Access:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr style="background-color: #f2f2f2;">
                  <th style="padding: 10px; border: 1px solid #ddd;">Username</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">Password</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${nim}</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${password}</td>
                </tr>
              </table>
              <p style="font-size: 16px; color: #555; margin-top: 15px;">Use the provided credentials to sign in and access your account.</p>
              <p style="font-size: 16px; color: #555;">Best regards,</p>
              <p style="font-size: 16px; color: #555;">Student Leaving Permission | Jurusan Teknik Komputer dan Informatika</p>
            </div>
          `,
        };

        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent: %s", info.messageId);
          }
        });

        successData.push(createdMahasiswa);
      } catch (error) {
        failureData.push({ ...mahasiswa, error: error.message });
      }
    }

    fs.unlinkSync(excel.tempFilePath);

    res.status(200).json({
      success: successData,
      failure: failureData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred" });
  }
};

exports.findAll = (req, res) => {
  Mahasiswa.findAll({
    include: [db.prodi, db.angkatan, db.kelas],
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
  const id = req.params.nim;

  Mahasiswa.update(req.body, {
    where: { nim: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mahasiswa was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Mahasiswa with id=${id}. Maybe Mahasiswa was not found or req.body is empty!`,
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

  Mahasiswa.destroy({
    where: { nim: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mahasiswa was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Mahasiswa with id=${id}. Maybe Mahasiswa was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Mahasiswa with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Mahasiswa with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Mahasiswa with id=" + id,
      });
    });
};

exports.findByClass = (req, res) => {
  const dosenwali_id = req.params.dosenwali_id;
  Mahasiswa.findAll({
    include: [db.prodi, db.angkatan, db.kelas],
    where: {
      walidosen_id: dosenwali_id,
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
