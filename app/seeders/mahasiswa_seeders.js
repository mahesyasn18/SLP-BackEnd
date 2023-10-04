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
    prodi_id: 1,
    kelas_id: 2,
    angkatan_id: 3,
  });
}
module.exports = initialMahasiswa;
