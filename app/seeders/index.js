const initialRole = require("./role_seeders");
const initialAdmin = require("./admin_seeders");
const initialKelas = require("./kelas_seeders");
const initialProdi = require("./prodi_seeders");
const initialAngkatan = require("./angkatan_seeders");
const intialSemester = require("./semester_seeder");
const initialMataKuliah = require("./mata_kuliah_seeders");
const initialDetailMataKuliah = require("./detail_mata_kuliah_seeders");
const initialWaliKelas = require("./wali_kelas_seeders");

module.exports = {
  initialRole,
  initialAdmin,
  initialKelas,
  initialProdi,
  initialAngkatan,
  intialSemester,
  initialMataKuliah,
  initialDetailMataKuliah,
  initialWaliKelas,
};
