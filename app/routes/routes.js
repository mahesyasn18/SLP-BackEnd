const { authJwt } = require("../middleware");
const controller = require("../controllers/admin_controller");
const admin = require("../controllers/admin_controller");
const kelas = require("../controllers/kelas_controller");
const mahasiswa = require("../controllers/mahasiswa_controller");
const dosen = require("../controllers/dosen_controller");
const dosen_wali = require("../controllers/dosen_wali_controller");
const perizinan = require("../controllers/perizinan_controller");
const semester = require("../controllers/semester_controller");
const angkatan = require("../controllers/angkatan_controller");
const prodi = require("../controllers/prodi_controller");
const mahasiswa_roles = require("../controllers/mahasiswa_content_controller");
const fileUpload = require("express-fileupload");

const uploadOpts = {
  useTempFiles: true,
  tempFileDir: "/tmp/",
};

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("api/admins", [authJwt.verifyToken, authJwt.isAdmin], admin.findAll);

  /* 
  ========================================
  Routes Admins
  ========================================
*/

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

  app.put(
    "/api/admins/mahasiswa/update/:nim",
    [authJwt.verifyToken, authJwt.isAdmin],
    mahasiswa.update
  );

  app.delete(
    "/api/admins/mahasiswa/destroy/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    mahasiswa.delete
  );

  app.get(
    "/api/admins/mahasiswa/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    mahasiswa.findOne
  );

  app.get(
    "/api/admins/dosen",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen.findAll
  );

  app.put(
    "/api/admins/dosen/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen.update
  );

  app.post(
    "/api/admins/dosen/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen.create
  );

  app.delete(
    "/api/admins/dosen/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen.delete
  );

  app.get(
    "/api/admins/dosen/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen.findOne
  );

  app.get(
    "/api/admins/dosen_wali",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen_wali.findAll
  );

  app.put(
    "/api/admins/dosen_wali/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen_wali.update
  );

  app.post(
    "/api/admins/import/dosen",
    [authJwt.verifyToken, authJwt.isAdmin],
    fileUpload(uploadOpts),
    dosen.importExcel
  );

  app.post(
    "/api/admins/dosen_wali/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen_wali.create
  );

  app.get(
    "/api/admins/dosen_wali/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen_wali.findOne
  );

  app.get(
    "/api/admins/angkatan",
    [authJwt.verifyToken, authJwt.isAdmin],
    angkatan.findAll
  );

  app.get(
    "/api/admins/prodi",
    [authJwt.verifyToken, authJwt.isAdmin],
    prodi.findAll
  );

  app.get(
    "/api/admins/perizinan",
    [authJwt.verifyToken, authJwt.isAdmin],
    perizinan.findAll
  );

  app.put(
    "/api/admins/perizinan/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    perizinan.update
  );

  app.post(
    "/api/admins/perizinan/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    perizinan.create
  );

  app.get(
    "/api/admins/perizinan/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    perizinan.findOne
  );

  app.get(
    "/api/admins/semester",
    [authJwt.verifyToken, authJwt.isAdmin],
    semester.findAll
  );

  app.put(
    "/api/admins/semesteer/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    semester.update
  );

  app.post(
    "/api/admins/semester/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    semester.create
  );

  app.get(
    "/api/admins/semester/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    semester.findOne
  );

  //user
  app.get(
    "/api/test/mahasiswa",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    mahasiswa_roles.mahasiswaBoard
  );
};
