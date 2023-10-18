module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'sdn1nagrikaler',
  DB: 'slp',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
