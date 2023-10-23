const db = require(".././models");
const Admin = db.admin;

function intialAdmin() {
  Admin.create({
    nama: "Admin 01",
    username: "admin",
    password: "admin",
    role_id: 1,
  });
}
module.exports = intialAdmin;
