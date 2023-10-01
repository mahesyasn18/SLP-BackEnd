const { authJwt } = require("../middleware");
const controller = require("../controllers/admin_controller");
const admin = require("../controllers/admin_controller");
const kelas = require("../controllers/kelas_controller");
const mahasiswa = require("../controllers/mahasiswa_controller");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    'api/admins',
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.findAll
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/admins/kelas",
    [authJwt.verifyToken, authJwt.isAdmin],
    kelas.findAll
  );

  app.get(
    "/api/admins/mahasiswa",
    [authJwt.verifyToken, authJwt.isAdmin],
    mahasiswa.findAll
  );

  app.post(
    "/api/admins/mahasiswa/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    mahasiswa.create
  );
};