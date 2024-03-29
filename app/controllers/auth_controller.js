const db = require("../models");
const config = require("../config/auth.config");
const Admin = db.admin;
const Role = db.role;
const Mahasiswa = db.mahasiswa;
const Kaprodi = db.Kaprodi;
const DosenWali = db.dosenWali;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = async (req, res) => {
  try {
    const adminUser = await Admin.findOne({
      where: {
        username: req.body.username,
      },
      include: Role,
    });
    let user = adminUser; // Default to Admin user
    let userType = "admin";

    if (!adminUser) {
      const mahasiswaUser = await Mahasiswa.findOne({
        where: {
          nim: req.body.username,
        },
        include: Role,
      });

      const dosenWaliUser = await DosenWali.findOne({
        where: {
          username: req.body.username,
        },
        include: Role,
      });

      const KaprodiUser = await Kaprodi.findOne({
        where: {
          username: req.body.username,
        },
        include: Role,
      });

      if (!adminUser && mahasiswaUser) {
        user = mahasiswaUser;
        userType = "mahasiswa";
      } else if (!adminUser && dosenWaliUser) {
        user = dosenWaliUser;
        userType = "dosen_wali";
      } else if (!adminUser && KaprodiUser) {
        user = KaprodiUser;
        userType = "kaprodi";
      }
    } else {
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const roleName = user.role ? user.role.name : "";
    const id =
      user.admin_id ?? user.nim ?? user.id_dosenwali ?? user.id_kaprodi;
    const token = jwt.sign({ id: id, userType }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;
    res.cookie("slp-session", token, {
      maxAge: 86400000, // Cookie will expire after 24 hours
      httpOnly: true, // Ensures that the cookie is only accessible via HTTP (not JavaScript)
    });

    return res.status(200).send({
      id: id,
      username: user.username ?? id,
      roles: roleName,
      userType: userType,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
