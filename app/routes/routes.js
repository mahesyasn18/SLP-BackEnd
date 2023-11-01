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
const detail_matkul = require("../controllers/detailMatkul_controller");
const matkul = require("../controllers/mataKuliah_controller");
const perizinanDosen = require("../controllers/perizinana_dosenWali_controller");
const mengajar = require("../controllers/mengajar_controller");
const fileUpload = require("express-fileupload");
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

  app.post(
    "/api/admins/import/mahasiswa",
    [authJwt.verifyToken, authJwt.isAdmin],
    fileUpload(uploadOpts),
    mahasiswa.importExcel
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

  app.delete(
    "/api/admins/semester/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    semester.delete
  );

  app.get(
    "/api/mahasiswa/semester/active",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    semester.findActive
  );

  app.get(
    "/api/admins/detailMatkul",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail_matkul.findAll
  );

  app.get(
    "/api/admins/detailMatkul/id",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail_matkul.findID
  );

  app.delete(
    "/api/admins/detailMatkul/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail_matkul.delete
  );

  app.put(
    "/api/admins/detailMatkul/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail_matkul.update
  );

  app.post(
    "/api/admins/detailMatkul/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail_matkul.create
  );

  app.get(
    "/api/admins/detailMatkul/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail_matkul.findOne
  );

  app.get(
    "/api/admins/matkul",
    [authJwt.verifyToken, authJwt.isAdmin],
    matkul.findAll
  );

  app.put(
    "/api/admins/matkul/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    matkul.update
  );

  app.post(
    "/api/admins/matkul/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    matkul.create
  );

  app.get(
    "/api/admins/matkul/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    matkul.findOne
  );

  app.delete(
    "/api/admins/matkul/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    matkul.delete
  );

  //angkatan detail matkul
  app.post(
    "/api/admins/create/angkatan/detailmatkul",
    [authJwt.verifyToken, authJwt.isAdmin],
    angkatan.createAngkatanMatkul
  );

  app.get(
    "/api/admins/jadwal/matkul",
    [authJwt.verifyToken, authJwt.isAdmin],
    angkatan.findAllAngkatanMatkul
  );

  app.post(
    "/api/admins/create/mengajar",
    [authJwt.verifyToken, authJwt.isAdmin],
    mengajar.createMengajar
  );

  /* 
  ========================================
  Routes User
  ========================================
*/
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

  app.post(
    "/api/mahasiswa/perizinan/draft",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    perizinan.createDraft
  );

  app.get(
    "/api/mahasiswa/perizinan",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    perizinan.findAll
  );

  app.get(
    "/api/mahasiswa/perizinan/list/draft",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    perizinan.findAllDraft
  );
  app.get(
    "/api/mahasiswa/list/matkul/mahasiswa/:id_semester/:id_prodi/:id_kelas/:id_angkatan",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    angkatan.findAllAngkatanMatkulperMahasiswa
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

  app.get(
    "/api/mahasiswa/:id",
    [authJwt.verifyToken, authJwt.isMahasiswa],
    mahasiswa.findOne
  );

  /* 
  ========================================
  Routes Dosen Wali
  ========================================
*/

  app.get(
    "/api/dosenWali/perizinan/:walidosen_id",
    [authJwt.verifyToken, authJwt.isDosenWali],
    perizinanDosen.findAllbyDosen
  );

  app.get(
    "/api/dosenWali/perizinan",
    [authJwt.verifyToken, authJwt.isDosenWali],
    perizinanDosen.findAll
  );

  app.get(
    "/api/dosenWali/perizinan/izin",
    [authJwt.verifyToken, authJwt.isDosenWali],
    perizinanDosen.findIzin
  );

  app.get(
    "/api/dosenWali/perizinan/izin/:walidosen_id",
    [authJwt.verifyToken, authJwt.isDosenWali],
    perizinanDosen.findIzinbyDosen
  );

  app.get(
    "/api/dosenWali/mahasiswa/:dosenwali_id",
    [authJwt.verifyToken, authJwt.isDosenWali],
    mahasiswa.findByClass
  );

  app.get(
    "/api/dosenWali/perizinan/sakit",
    [authJwt.verifyToken, authJwt.isDosenWali],
    perizinanDosen.findSakits
  );

  app.get(
    "/api/dosenWali/perizinan/sakit/:walidosen_id",
    [authJwt.verifyToken, authJwt.isDosenWali],
    perizinanDosen.findSakit
  );

  app.put(
    "/api/dosenWali/perizinan/update/:id",
    [authJwt.verifyToken, authJwt.isDosenWali],
    perizinanDosen.update
  );

  app.get("/api/dosenWali/perizinan/surat/:filename", (req, res) => {
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
