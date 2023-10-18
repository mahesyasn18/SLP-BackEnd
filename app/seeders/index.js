const initialRole = require("./role_seeders");
const initialAdmin = require("./admin_seeders");
const initialKelas = require("./kelas_seeders");
const initialProdi = require("./prodi_seeders");
const initialAngkatan = require("./angkatan_seeders");
const intialSemester = require("./semester_seeder");
const initialMahasiswa = require("./mahasiswa_seeders");
const initialMataKuliah = require("./mata_kuliah_seeders");
const initialDetailMataKuliah = require("./detail_mata_kuliah_seeders");
const initialJadwal = require("./jadwal_matkul_seeders");
const initialDosen = require("./dosen_seeders");
const initialDosenWali = require("./dosen_wali_seeders");
const initialWaliKelas = require("./wali_kelas_seeders");

module.exports = {
  initialRole,
  initialAdmin,
  initialKelas,
  initialProdi,
  initialAngkatan,
  intialSemester,
  initialMahasiswa,
  initialMataKuliah,
  initialDetailMataKuliah,
  initialJadwal,
  initialDosen,
  initialDosenWali,
  initialWaliKelas,
};
