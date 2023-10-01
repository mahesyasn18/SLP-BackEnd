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
      idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin_migration.js")(sequelize, Sequelize);
db.role = require("./role_migration.js")(sequelize, Sequelize);
db.kelas = require("./kelas_migration.js")(sequelize, Sequelize);
db.prodi = require("./prodi_migration.js")(sequelize, Sequelize);
db.mahasiswa = require("./mahasiswa_migration.js")(sequelize, Sequelize);


//admin dan role
db.role.hasOne(db.admin, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});
db.admin.belongsTo(db.role);

// Mahasiswa and Role relationship
db.role.hasOne(db.mahasiswa, {
  foreignKey: 'roleId', 
  as: 'role' 
});
db.mahasiswa.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: 'role'
});

// Mahasiswa and Prodi relationship
db.prodi.hasOne(db.mahasiswa, {
  foreignKey: 'prodiId',
  as: 'prodi'
});
db.mahasiswa.belongsTo(db.prodi, {
  foreignKey: 'prodiId',
  as: 'prodi'
});

// Mahasiswa and Kelas relationship
db.kelas.hasOne(db.mahasiswa, {
  foreignKey: 'kelasId',
  as: 'kelas'
});
db.mahasiswa.belongsTo(db.kelas, {
  foreignKey: 'kelasId',
  as: 'kelas'
});


db.ROLES = ["admin", "mahasiswa"];
module.exports = db;