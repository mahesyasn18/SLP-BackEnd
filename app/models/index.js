const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
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

db.admin = require('./admin_migration.js')(sequelize, Sequelize);
db.role = require('./role_migration.js')(sequelize, Sequelize);
db.kelas = require('./kelas_migration.js')(sequelize, Sequelize);
db.prodi = require('./prodi_migration.js')(sequelize, Sequelize);
db.mahasiswa = require('./mahasiswa_migration.js')(sequelize, Sequelize);
db.dosen = require('./dosen_migration.js')(sequelize, Sequelize);
db.dosenWali = require('./dosen_wali_migration.js')(sequelize, Sequelize);
db.angkatan = require('./angkatan_migration.js')(sequelize, Sequelize);
db.matakuliah = require('./mata_kuliah_migration.js')(sequelize, Sequelize);
db.detailMatkul = require('./detail_matkul_migration.js')(sequelize, Sequelize);
db.semester = require('./semester_migration.js')(sequelize, Sequelize);
db.perizinan = require('./perizinan_migratin.js')(sequelize, Sequelize);
db.walikelas = require('./wali_kelas_migration.js')(sequelize, Sequelize);
db.detailPerizinan = require('./detail_perizinan_migration.js')(sequelize, Sequelize);

db.AngkatanMatkul = require('./angkatan_detail_matkul_controller.js')(sequelize, Sequelize);
db.Mengajar = require('./mengajar_migration.js')(sequelize, Sequelize);

/* 
  ========================================
  Relation Admin
  ========================================
*/
//admin dan role
db.role.hasOne(db.admin, {
  onDelete: 'RESTRICT',
  foreignKey: 'role_id',
});
db.admin.belongsTo(db.role, {
  foreignKey: 'role_id',
});

/* 
  ========================================
  Relation Mahasiswa
  ========================================
*/

// Mahasiswa and Role relationship
db.role.hasOne(db.mahasiswa, {
  onDelete: 'RESTRICT',
  foreignKey: 'role_id',
});
db.mahasiswa.belongsTo(db.role, {
  foreignKey: 'role_id',
});

// Mahasiswa and Prodi relationship
db.prodi.hasOne(db.mahasiswa, {
  onDelete: 'RESTRICT',
  foreignKey: 'prodi_id',
});
db.mahasiswa.belongsTo(db.prodi, {
  foreignKey: 'prodi_id',
});

// Mahasiswa and Kelas relationship
db.kelas.hasOne(db.mahasiswa, {
  onDelete: 'RESTRICT',
  foreignKey: 'kelas_id',
});
db.mahasiswa.belongsTo(db.kelas, {
  foreignKey: 'kelas_id',
});

//mahasiswa dan angkatan
db.angkatan.hasOne(db.mahasiswa, {
  onDelete: 'RESTRICT',
  foreignKey: 'angkatan_id',
});
db.mahasiswa.belongsTo(db.angkatan, {
  foreignKey: 'angkatan_id',
});

//mahasiswa dan dosenwali
db.dosenWali.hasOne(db.mahasiswa, {
  onDelete: 'RESTRICT',
  foreignKey: 'walidosen_id',
});
db.mahasiswa.belongsTo(db.dosenWali, {
  foreignKey: 'walidosen_id',
});

/* 
  ========================================
  Relation Dosen Wali
  ========================================
*/

// Dosen and Role relationship
db.role.hasOne(db.dosenWali, {
  onDelete: 'RESTRICT',
  foreignKey: 'role_id',
});

db.dosenWali.belongsTo(db.role, {
  foreignKey: 'role_id',
});

// dosenwali dan dosen
db.dosen.hasOne(db.dosenWali, {
  onDelete: 'RESTRICT',
  foreignKey: 'dosen_id',
});

db.dosenWali.belongsTo(db.dosen, {
  foreignKey: 'dosen_id',
});

//dosenwali dan angkatan
db.angkatan.hasOne(db.dosenWali, {
  onDelete: 'RESTRICT',
  foreignKey: 'angkatan_id',
});
db.dosenWali.belongsTo(db.angkatan, {
  foreignKey: 'angkatan_id',
});

//dosenwali dan kelas
db.kelas.hasOne(db.dosenWali, {
  onDelete: 'RESTRICT',
  foreignKey: 'kelas_id',
});
db.dosenWali.belongsTo(db.kelas, {
  foreignKey: 'kelas_id',
});

//dosenwali dan prodi
db.prodi.hasOne(db.dosenWali, {
  onDelete: 'RESTRICT',
  foreignKey: 'prodi_id',
});
db.dosenWali.belongsTo(db.prodi, {
  foreignKey: 'prodi_id',
});

/* 
  ========================================
  Relation Detail Matakuliah
  ========================================
*/

//detail matkul dan prodi
db.prodi.hasOne(db.detailMatkul, {
  onDelete: 'RESTRICT',
  foreignKey: 'prodi_id',
});
db.detailMatkul.belongsTo(db.prodi, {
  foreignKey: 'prodi_id',
});

//detail matkul dan matkul
db.matakuliah.hasOne(db.detailMatkul, {
  onDelete: 'RESTRICT',
  foreignKey: 'matkul_id',
});
db.detailMatkul.belongsTo(db.matakuliah, {
  foreignKey: 'matkul_id',
});

/*
  ========================================
  Relation Dosen dan Mata Kuliah
  ========================================
*/

db.dosen.belongsToMany(db.detailMatkul, {
  through: db.Mengajar,
  foreignKey: 'id_dosen',
  otherKey: 'id_detail_matkul',
});
db.detailMatkul.belongsToMany(db.dosen, {
  through: db.Mengajar,
  foreignKey: 'id_detail_matkul',
  otherKey: 'id_dosen',
});
db.semester.hasOne(db.Mengajar, {
  foreignKey: 'id_semester',
  onDelete: 'RESTRICT',
});
db.Mengajar.belongsTo(db.semester, {
  foreignKey: 'id_semester',
});

db.angkatan.hasMany(db.Mengajar, {
  onDelete: 'RESTRICT',
  foreignKey: 'angkatan_id',
});
db.Mengajar.belongsTo(db.angkatan, {
  foreignKey: 'angkatan_id',
});

db.kelas.hasMany(db.Mengajar, {
  onDelete: 'RESTRICT',
  foreignKey: 'kelas_id',
});
db.Mengajar.belongsTo(db.kelas, {
  foreignKey: 'kelas_id',
});

db.prodi.hasMany(db.Mengajar, {
  onDelete: 'RESTRICT',
  foreignKey: 'prodi_id',
});
db.Mengajar.belongsTo(db.prodi, {
  foreignKey: 'prodi_id',
});

/* 
  ========================================
  Relation perizinan
  ========================================
*/
//detail perizinan dan mahasiswa
db.mahasiswa.hasOne(db.perizinan, {
  onDelete: 'RESTRICT',
  foreignKey: 'nim',
});
db.perizinan.belongsTo(db.mahasiswa, {
  foreignKey: 'nim',
});

db.semester.hasOne(db.perizinan, {
  onDelete: 'RESTRICT',
  foreignKey: 'id_semester',
});
db.perizinan.belongsTo(db.semester, {
  foreignKey: 'id_semester',
});

/* 
  ========================================
  Relation Detail perizinan
  ========================================
*/
//detail perizinan dan mahasiswa
db.perizinan.hasOne(db.detailPerizinan, {
  foreignKey: 'perizinan_id',
});
db.detailPerizinan.belongsTo(db.perizinan, {
  foreignKey: 'perizinan_id',
});

//detail perizinan dan detail matkul
db.detailMatkul.hasOne(db.detailPerizinan, {
  foreignKey: 'id_detail_matkul',
});
db.detailPerizinan.belongsTo(db.detailMatkul, {
  foreignKey: 'id_detail_matkul',
});

db.mahasiswa.hasOne(db.walikelas, {
  onDelete: 'RESTRICT',
  foreignKey: 'nim',
});
db.walikelas.belongsTo(db.mahasiswa, {
  foreignKey: 'nim',
});

//detail perizinan dan detail matkul
db.dosenWali.hasOne(db.walikelas, {
  onDelete: 'RESTRICT',
  foreignKey: 'id_dosenwali',
});
db.walikelas.belongsTo(db.dosenWali, {
  foreignKey: 'id_dosenwali',
});

/* 
  ========================================
  Relation Angkatan dan detail matkul
  ========================================
*/

db.angkatan.belongsToMany(db.detailMatkul, {
  through: db.AngkatanMatkul,
  foreignKey: 'id_angkatan',
});

db.detailMatkul.belongsToMany(db.angkatan, {
  through: db.AngkatanMatkul,
  foreignKey: 'id_detail_matkul',
});
db.AngkatanMatkul.belongsTo(db.angkatan, {
  foreignKey: 'id_angkatan',
});
db.AngkatanMatkul.belongsTo(db.detailMatkul, {
  foreignKey: 'id_detail_matkul',
});
db.detailMatkul.hasMany(db.AngkatanMatkul, {
  foreignKey: 'id_detail_matkul',
});
db.angkatan.hasMany(db.AngkatanMatkul, {
  foreignKey: 'id_angkatan',
});

db.semester.hasMany(db.AngkatanMatkul, {
  foreignKey: 'id_semester',
  onDelete: 'RESTRICT',
});

db.AngkatanMatkul.belongsTo(db.semester, {
  foreignKey: 'id_semester',
});

db.prodi.hasMany(db.AngkatanMatkul, {
  foreignKey: 'id_prodi',
  onDelete: 'RESTRICT',
});
db.AngkatanMatkul.belongsTo(db.prodi, {
  foreignKey: 'id_prodi',
});

db.kelas.hasMany(db.AngkatanMatkul, {
  foreignKey: 'id_kelas',
  onDelete: 'RESTRICT',
});
db.AngkatanMatkul.belongsTo(db.kelas, {
  foreignKey: 'id_kelas',
});

db.ROLES = ['admin', 'mahasiswa', 'dosenWali'];
module.exports = db;
