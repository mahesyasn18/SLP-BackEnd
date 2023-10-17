const db = require(".././models");
const DosenPengampu = db.dosenWali;

function initialDosenWali() {
  DosenPengampu.create({
    id_dosenwali: "BD32022",
    username: "sprh123",
    password: "12345678",
    role_id: 3,
    dosen_id: "KO004N",
    angkatan_id: 3,
    kelas_id: "2",
    prodi_id: "1",
  });
}

module.exports = initialDosenWali;
