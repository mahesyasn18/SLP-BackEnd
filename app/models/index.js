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
  as: "mahasiswaRole",
});
db.mahasiswa.belongsTo(db.role, {
  foreignKey: "role_id",
  as: "mahasiswaRole",
});

// Mahasiswa and Prodi relationship
db.prodi.hasOne(db.mahasiswa, {
  foreignKey: "prodi_id",
  as: "prodi",
});
db.mahasiswa.belongsTo(db.prodi, {
  foreignKey: "prodi_id",
  as: "prodi",
});

// Mahasiswa and Kelas relationship
db.kelas.hasOne(db.mahasiswa, {
  foreignKey: "kelas_id",
  as: "kelas",
});
db.mahasiswa.belongsTo(db.kelas, {
  foreignKey: "kelas_id",
  as: "kelas",
});

//mahasiswa dan angkatan
db.angkatan.hasOne(db.mahasiswa, {
  foreignKey: "angkatan_id",
  as: "angkatan",
});
db.mahasiswa.belongsTo(db.angkatan, {
  foreignKey: "angkatan_id",
  as: "angkatan",
});

/* 
  ========================================
  Relation Dosen Wali
  ========================================
*/

// Dosen and Role relationship
db.role.hasOne(db.dosenWali, {
  foreignKey: "role_id",
  as: "dosenWaliRole",
});

db.dosenWali.belongsTo(db.role, {
  foreignKey: "role_id",
  as: "dosenWaliRole",
});

// dosenwali dan dosen
db.dosen.hasOne(db.dosenWali, {
  foreignKey: "dosen_id",
  as: "dosenWaliDosen",
});

db.dosenWali.belongsTo(db.dosen, {
  foreignKey: "dosen_id",
  as: "dosenWaliDosen",
});

//dosenwali dan angkatan
db.angkatan.hasOne(db.dosenWali, {
  foreignKey: "angkatan_id",
  as: "angkatandosenWali",
});
db.dosenWali.belongsTo(db.angkatan, {
  foreignKey: "angkatan_id",
  as: "angkatandosenWali",
});

//dosenwali dan kelas
db.kelas.hasOne(db.dosenWali, {
  foreignKey: "kelas_id",
  as: "kelasdosenwali",
});
db.dosenWali.belongsTo(db.kelas, {
  foreignKey: "kelas_id",
  as: "kelasdosenwali",
});

//dosenwali dan prodi
db.prodi.hasOne(db.dosenWali, {
  foreignKey: "prodi_id",
  as: "prodidosenwali",
});
db.dosenWali.belongsTo(db.prodi, {
  foreignKey: "prodi_id",
  as: "prodidosenwali",
});

db.ROLES = ["admin", "mahasiswa", "dosenWali"];
module.exports = db;
