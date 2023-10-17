const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Admin = db.admin;
const Mahasiswa = db.mahasiswa;
const Dosenwali = db.dosenWali;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.userId, {
      include: {
        model: db.role,
      },
    });
    console.log(req);
    if (!admin) {
      return res.status(404).send({
        message: "Admin not found",
      });
    }
    const userRole = admin.role;
    if (userRole.name === "admin") {
      return next();
    }
    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Admin role!",
    });
  }
};

isMahasiswa = async (req, res, next) => {
  try {
    const mahasiswa = await Mahasiswa.findByPk(req.userId, {
      include: {
        model: db.role,
      },
    });
    console.log(req);

    if (!mahasiswa) {
      return res.status(404).send({
        message: "Mahasiswa not found",
      });
    }
    const userRole = mahasiswa.role;
    if (userRole.name === "mahasiswa") {
      return next();
    }
    return res.status(403).send({
      message: "Require Mahasiswa Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Mahasiswa role!",
    });
  }
};

isDosenWali = async (req, res, next) => {
  try {
    const dosenwali = await Dosenwali.findByPk(req.userId, {
      include: {
        model: db.role,
      },
    });
    console.log(req);

    if (!dosenwali) {
      return res.status(404).send({
        message: "Dosen Wali not found",
      });
    }
    const userRole = dosenwali.role;
    if (userRole.name === "dosen_wali") {
      return next();
    }
    return res.status(403).send({
      message: "Require Dosen Wali Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Dosen Wali role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMahasiswa,
  isDosenWali,
};

module.exports = authJwt;
