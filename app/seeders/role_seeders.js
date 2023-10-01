const db = require(".././models");
const Role = db.role;

function initialRole() {
    Role.create({
      id: 1,
      name: "admin"
    });
   
    Role.create({
      id: 2,
      name: "mahasiswa"
    });
}

module.exports = initialRole;