const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin_migration.js")(sequelize, Sequelize);
db.role = require("./role_migration.js")(sequelize, Sequelize);
db.kelas = require("./kelas_migration.js")(sequelize, Sequelize);
db.prodi = require("./prodi_migration.js")(sequelize, Sequelize);
db.mahasiswa = require("./mahasiswa_migration.js")(sequelize, Sequelize);
db.dosen = require("./dosen_migration.js")(sequelize, Sequelize);
db.dosenWali = require("./dosen_wali_migration.js")(sequelize, Sequelize);
db.angkatan = require("./angkatan_migration.js")(sequelize, Sequelize);
db.jadwal = require("./jadwal_matkul.js")(sequelize, Sequelize);
db.matakuliah = require("./mata_kuliah_migration.js")(sequelize, Sequelize);
db.detailMatkul = require("./detail_matkul_migration.js")(sequelize, Sequelize);
db.semester = require("./semester_migration.js")(sequelize, Sequelize);
db.perizinan = require("./perizinan_migratin.js")(sequelize, Sequelize);
db.walikelas = require("./wali_kelas_migration.js")(sequelize, Sequelize);
db.detailPerizinan = require("./detail_perizinan_migration.js")(
  sequelize,
  Sequelize
);
/* 
  ========================================
  Relation Admin
  ========================================
*/
//admin dan role
db.role.hasOne(db.admin, {
  foreignKey: "role_id",
});
db.admin.belongsTo(db.role, {
  foreignKey: "role_id",
});

/* 
  ========================================
  Relation Mahasiswa
  ========================================
*/

// Mahasiswa and Role relationship
db.role.hasOne(db.mahasiswa, {
  foreignKey: "role_id",
});
db.mahasiswa.belongsTo(db.role, {
  foreignKey: "role_id",
});

// Mahasiswa and Prodi relationship
db.prodi.hasOne(db.mahasiswa, {
  foreignKey: "prodi_id",
});
db.mahasiswa.belongsTo(db.prodi, {
  foreignKey: "prodi_id",
});

// Mahasiswa and Kelas relationship
db.kelas.hasOne(db.mahasiswa, {
  foreignKey: "kelas_id",
});
db.mahasiswa.belongsTo(db.kelas, {
  foreignKey: "kelas_id",
});

//mahasiswa dan angkatan
db.angkatan.hasOne(db.mahasiswa, {
  foreignKey: "angkatan_id",
});
db.mahasiswa.belongsTo(db.angkatan, {
  foreignKey: "angkatan_id",
});

/* 
  ========================================
  Relation Dosen Wali
  ========================================
*/

// Dosen and Role relationship
db.role.hasOne(db.dosenWali, {
  foreignKey: "role_id",
});

db.dosenWali.belongsTo(db.role, {
  foreignKey: "role_id",
});

// dosenwali dan dosen
db.dosen.hasOne(db.dosenWali, {
  foreignKey: "dosen_id",
});

db.dosenWali.belongsTo(db.dosen, {
  foreignKey: "dosen_id",
});

//dosenwali dan angkatan
db.angkatan.hasOne(db.dosenWali, {
  foreignKey: "angkatan_id",
});
db.dosenWali.belongsTo(db.angkatan, {
  foreignKey: "angkatan_id",
});

//dosenwali dan kelas
db.kelas.hasOne(db.dosenWali, {
  foreignKey: "kelas_id",
});
db.dosenWali.belongsTo(db.kelas, {
  foreignKey: "kelas_id",
});

//dosenwali dan prodi
db.prodi.hasOne(db.dosenWali, {
  foreignKey: "prodi_id",
});
db.dosenWali.belongsTo(db.prodi, {
  foreignKey: "prodi_id",
});

/* 
  ========================================
  Relation Detail Matakuliah
  ========================================
*/

//detail matkul dan prodi
db.prodi.hasOne(db.detailMatkul, {
  foreignKey: "prodi_id",
});
db.detailMatkul.belongsTo(db.prodi, {
  foreignKey: "prodi_id",
});

//detail matkul dan matkul
db.matakuliah.hasOne(db.detailMatkul, {
  foreignKey: "matkul_id",
});
db.detailMatkul.belongsTo(db.matakuliah, {
  foreignKey: "matkul_id",
});

/* 
  ========================================
  Relation Jadwal Matkul
  ========================================
*/

//jadwal dan semester
db.semester.hasOne(db.jadwal, {
  foreignKey: "semester_id",
});
db.jadwal.belongsTo(db.semester, {
  foreignKey: "semester_id",
});

//Jadwal matkul dan matkul
db.detailMatkul.hasOne(db.jadwal, {
  foreignKey: "detailMatkul_id",
});
db.jadwal.belongsTo(db.detailMatkul, {
  foreignKey: "detailMatkul_id",
});

//Jadwal matkul dan kelas
db.kelas.hasOne(db.jadwal, {
  foreignKey: "kelas_id",
});
db.jadwal.belongsTo(db.kelas, {
  foreignKey: "kelas_id",
});

/* 
  ========================================
  Relation Dosen dan Mata Kuliah
  ========================================
*/

db.dosen.belongsToMany(db.jadwal, { through: "mengajar" });
db.jadwal.belongsToMany(db.dosen, { through: "mengajar" });

/* 
  ========================================
  Relation Mahasiswa dan Mata Kuliah
  ========================================
*/
db.mahasiswa.belongsToMany(db.jadwal, { through: "mengikuti" });
db.jadwal.belongsToMany(db.mahasiswa, { through: "mengikuti" });

/* 
  ========================================
  Relation perizinan
  ========================================
*/
//detail perizinan dan mahasiswa
db.mahasiswa.hasOne(db.perizinan, {
  foreignKey: "nim",
});
db.perizinan.belongsTo(db.mahasiswa, {
  foreignKey: "nim",
});

/* 
  ========================================
  Relation Detail perizinan
  ========================================
*/
//detail perizinan dan mahasiswa
db.perizinan.hasOne(db.detailPerizinan, {
  foreignKey: "perizinan_id",
});
db.detailPerizinan.belongsTo(db.perizinan, {
  foreignKey: "perizinan_id",
});

//detail perizinan dan detail matkul
db.detailMatkul.hasOne(db.detailPerizinan, {
  foreignKey: "id_detail_matkul",
});
db.detailPerizinan.belongsTo(db.detailMatkul, {
  foreignKey: "id_detail_matkul",
});

db.mahasiswa.hasOne(db.walikelas, {
  foreignKey: "nim",
});
db.walikelas.belongsTo(db.mahasiswa, {
  foreignKey: "nim",
});

//detail perizinan dan detail matkul
db.dosenWali.hasOne(db.walikelas, {
  foreignKey: "id_dosenwali",
});
db.walikelas.belongsTo(db.dosenWali, {
  foreignKey: "id_dosenwali",
});

db.ROLES = ["admin", "mahasiswa", "dosenWali"];
module.exports = db;
