const db = require("../models");
const Dosen_Wali = db.dosenWali;
const mahasiswa = db.mahasiswa;
const dosen = db.dosen;
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../../env.js");

exports.create = async (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.role_id ||
    !req.body.dosen_id ||
    !req.body.prodi_id ||
    !req.body.kelas_id ||
    !req.body.angkatan_id
  ) {
    res.status(400).send({
      message: "Please provide all the required fields.",
    });
    return;
  }

  const dosen_id = req.body.dosen_id;
  console.log("Dosen ID:", dosen_id);

  const data_dosen = await dosen.findOne({
    where: {
      kode_dosen: dosen_id,
    },
  });

  console.log(data_dosen);

  const dosen_wali = {
    id_dosenwali: req.body.angkatan_id + req.body.dosen_id + req.body.kelas_id,
    username: req.body.username,
    password: req.body.password,
    role_id: req.body.role_id,
    dosen_id: req.body.dosen_id,
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
    to: data_dosen.dataValues.email,
    subject: "Account Access to Student Leaving Permission",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 18px; color: #333;">Hello ${data_dosen.dataValues.nama_dosen},</p>
        <p style="font-size: 16px; color: #555;">Here are your account Access:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd;">Username</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Password</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${req.body.username}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${req.body.password}</td>
          </tr>
        </table>
        <p style="font-size: 16px; color: #555; margin-top: 15px;">Use the provided credentials to sign in and access your account.</p>
        <p style="font-size: 16px; color: #555;">Best regards,</p>
        <p style="font-size: 16px; color: #555;">Student Leaving Permission | Jurusan Teknik Komputer dan Informatika</p>
      </div>
    `,
  };

  // First, create the Dosen Wali
  Dosen_Wali.create(dosen_wali)
    .then((data) => {
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      });

      // Now, update the Mahasiswa fields
      return mahasiswa.update(
        {
          walidosen_id:
            req.body.angkatan_id + req.body.dosen_id + req.body.kelas_id,
        },
        {
          where: {
            prodi_id: req.body.prodi_id,
            kelas_id: req.body.kelas_id,
            angkatan_id: req.body.angkatan_id,
          },
        }
      );
    })
    .then(() => {
      res.send("Dosen Wali created and Mahasiswa fields updated successfully.");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Dosen Wali and updating Mahasiswa fields.",
      });
    });
};

exports.findAll = (req, res) => {
  Dosen_Wali.findAll({
    include: [db.prodi, db.angkatan, db.kelas, db.dosen],
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

exports.update = (req, res) => {
  const id = req.params.id;

  Dosen_Wali.update(req.body, {
    where: { id_dosenwali: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dosen Wali was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Dosen Wali with id=${id}. Maybe Dosen Wali was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Dosen Wali with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Dosen_Wali.destroy({
    where: { id_dosenwali: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dosen Wali was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dosen Wali with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Dosen Wali with id=${id}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Dosen_Wali.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Dosen Wali with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Dosen Wali with id=${id}`,
      });
    });
};
