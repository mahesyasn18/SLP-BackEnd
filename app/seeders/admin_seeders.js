const db = require(".././models");
const Admin = db.admin;

function initialAdmin() {
  Admin.create({
    id: 1,
    nama: "Admin-01",
    username: "admin",
    password: "admin",
    role_id: 1,
  });
}

module.exports = initialAdmin;
