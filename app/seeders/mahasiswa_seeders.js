const db = require(".././models");
const Mahasiswa = db.mahasiswa;

function initialMahasiswa() {
  Mahasiswa.create({
    nim: 221511054,
    nama: "Mahesya Setia Nugraha",
    username: "cnth_mhs",
    password: "12345678",
    role_id: 2,
    no_telp: "087802351311",
    no_telp_orang_tua: "087802351311",
    prodiId: 1,
    kelasId: 2,
    angkatan: 3,
  });
}
module.exports = initialMahasiswa;
