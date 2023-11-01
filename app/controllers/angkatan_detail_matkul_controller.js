const db = require("../models");
const AngkatanMatkul = db.angkatanMatkul;

exports.create = async (req, res) => {
  try {
    const { id_angkatan, id_detail_matkul, id_semester, id_prodi, id_kelas } =
      req.body;

    // Pastikan Anda validasi data yang diterima dari klien di sini.

    // Membuat instansi untuk tabel terkait
    const angkatanInstance = await db.angkatan.create({ id_angkatan });
    const detailMatkulInstance = await db.detailMatkul.create({
      id_detail_matkul,
    });
    const semesterInstance = await db.semester.create({ id_semester });
    const prodiInstance = await db.prodi.create({ id_prodi });
    const kelasInstance = await db.kelas.create({ id_kelas });

    // Menghubungkan data ke tabel AngkatanMatkul dan tabel terkait lainnya
    await angkatanInstance.addDetailMatkul(detailMatkulInstance);
    await angkatanInstance.setSemester(semesterInstance);
    await angkatanInstance.setProdi(prodiInstance);
    await angkatanInstance.setKelas(kelasInstance);

    // Memberikan respons sukses ke klien
    res
      .status(201)
      .json({ message: "Data telah ditambahkan ke tabel AngkatanMatkul." });
  } catch (error) {
    // Handle error jika terjadi kesalahan
    res
      .status(500)
      .json({
        error:
          "Terjadi kesalahan saat menambahkan data ke tabel AngkatanMatkul.",
      });
  }
};

exports.findAll = (req, res) => {
  AngkatanMatkul.findAll({
    include: [
      db.prodi,
      {
        model: db.detailMatkul,
        include: [db.matakuliah],
      },
      db.semester,
      db.kelas,
      db.angkatan,
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail Matkul.",
      });
    });
};

exports.update = (req, res) => {
  const id_angkatan = req.params.id_angkatan;
  const id_detail_matkul = req.params.id_detail_matkul;

  // Validate request
  if (
    !req.body.id_angkatan ||
    !req.body.id_detail_matkul ||
    !req.body.id_semester ||
    !req.body.id_prodi ||
    !req.body.id_kelas
  ) {
    res.status(400).send({
      message: "Konten tidak boleh kosong!",
    });
    return;
  }

  AngkatanMatkul.update(req.body, {
    where: {
      id_angkatan: id_angkatan,
      id_detail_matkul: id_detail_matkul,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AngkatanMatkul berhasil diperbarui.",
        });
      } else {
        res.send({
          message: `Tidak dapat memperbarui AngkatanMatkul dengan id_angkatan=${id_angkatan} dan id_detail_matkul=${id_detail_matkul}. Mungkin AngkatanMatkul tidak ditemukan atau req.body kosong!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Terjadi kesalahan saat memperbarui AngkatanMatkul.",
      });
    });
};

exports.delete = (req, res) => {
  const id_angkatan = req.params.id_angkatan;
  const id_detail_matkul = req.params.id_detail_matkul;

  AngkatanMatkul.destroy({
    where: {
      id_angkatan: id_angkatan,
      id_detail_matkul: id_detail_matkul,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Detail Mata Kuliah was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dosen with id=${id}. Detail Maybe Mata kuliah was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Detail Mata Kuliah with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  AngkatanMatkul.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Detail Matkul with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Detail Matkul with id=" + id,
      });
    });
};
