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

    Role.create({
      id: 3,
      name: "dosen_wali"
    });
}

module.exports = initialRole;