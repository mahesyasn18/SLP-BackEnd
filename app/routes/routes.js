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
const jadwal = require("../controllers/jadwal_controller");
const mahasiswa_roles = require("../controllers/mahasiswa_content_controller");
const detail_matkul = require("../controllers/detailMatkul_controller");
const fileUpload = require("express-fileupload");
const express = require("express");
const path = require("path");
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

  /* 
  ========================================
  Routes Admins : Mahasiswa
  ========================================
*/

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

  /* 
  ========================================
  Routes Admins : Dosen Pengampu
  ========================================
*/

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

  app.post(
    "/api/admins/import/dosen",
    [authJwt.verifyToken, authJwt.isAdmin],
    fileUpload(uploadOpts),
    dosen.importExcel
  );

  /* 
  ========================================
  Routes Admins : Dosen Wali
  ========================================
*/
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
    "/api/admins/dosen_wali/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen_wali.create
  );

  app.delete(
    "/api/admins/dosen_wali/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen_wali.delete
  );
  
  app.get(
    "/api/admins/dosen_wali/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    dosen_wali.findOne
  );

  /* 
  ========================================
  Routes Admins : Kelola Akademik
  ========================================
*/

  app.get(
    "/api/admins/kelas",
    [authJwt.verifyToken, authJwt.isAdmin],
    kelas.findAll
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
    "/api/admins/jadwal",
    [authJwt.verifyToken, authJwt.isAdmin],
    jadwal.findAll
  );

  app.put(
    "/api/admins/jadwal/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    jadwal.update
  );

  app.post(
    "/api/admins/jadwal/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    jadwal.create
  );

  app.delete(
    "/api/admins/jadwal/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    jadwal.delete
  );

  app.get(
    "/api/admins/jadwal/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    jadwal.findOne
  );

  app.get(
    "/api/admins/semester",
    [authJwt.verifyToken, authJwt.isAdmin],
    semester.findAll
  );

  app.put(
    "/api/admins/semester/update/:id",
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

  app.get(
    "/api/mahasiswa/detail_matkul",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    detail_matkul.findAll
  );

  //user
  app.get(
    "/api/test/mahasiswa",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    mahasiswa_roles.mahasiswaBoard
  );
  app.post(
    "/api/mahasiswa/perizinan",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    perizinan.create
  );

  app.get(
    "/api/mahasiswa/perizinan",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    perizinan.findAll
  );

  app.get("/api/mahasiswa/perizinan/surat/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(
      "D:/study/Polban/Semester3/7. Proyek 3/SLP-BackEnd/",
      "uploads",
      filename
    );

    // Mengirimkan file surat kepada pengguna
    res.sendFile(filePath);
  });
};
