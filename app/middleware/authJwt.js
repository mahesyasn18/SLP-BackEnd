const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Admin = db.admin;


verifyToken = (req, res, next) => {
  let token = req.session.token;
  
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  
  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({message: "Unauthorized!",});
      }
      req.userId = decoded.id;
      next();
    });
};
  
isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.userId, { include: {
      model: db.role,
    },});
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
  
const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;