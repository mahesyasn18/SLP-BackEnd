const db = require("../models");
const Perizinan = db.perizinan;
const DetailMatKul = db.detailMatkul;
const multer = require("multer");
const path = require("path");
const Semester = db.semester;

exports.findAll = (req, res) => {
	const userId = req.userId;
	Perizinan.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.countByIdPerizinan = (req, res) => {
	const id_perizinan = req.params.id_perizinan;

	Perizinan.count({
		where: {
			status: "Menunggu Verifikasi",
		},
	})
		.then((count) => {
			res.send({ count });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while counting Perizinan by id_perizinan.",
			});
		});
};

exports.countIzinbyDosen = (req, res) => {
	const walidosen_id = req.params.walidosen_id;
	Perizinan.count({
		where: {
			jenis: "Izin", // Cocokkan dengan ID DosenWali
			status: "Menunggu Verifikasi",
		},
		include: [
			{
				model: db.mahasiswa,
				where: {
					walidosen_id: walidosen_id,
				},
			},
		],
	})
		.then((count) => {
			res.send({ count });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.countSakitbyDosen = (req, res) => {
	const walidosen_id = req.params.walidosen_id;
	Perizinan.count({
		where: {
			jenis: "Sakit", // Cocokkan dengan ID DosenWali
			status: "Diverifikasi",
		},
		include: [
			{
				model: db.mahasiswa,
				where: {
					walidosen_id: walidosen_id,
				},
			},
		],
	})
		.then((count) => {
			res.send({ count });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.totalPermohonanbyDosen = (req, res) => {
	const walidosen_id = req.params.walidosen_id;
	Perizinan.count({
		where: {
			// jenis: "Sakit", // Cocokkan dengan ID DosenWali
			status: "Menunggu Verifikasi",
		},
		include: [
			{
				model: db.mahasiswa,
				where: {
					walidosen_id: walidosen_id,
				},
			},
		],
	})
		.then((count) => {
			res.send({ count });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.findAll = (req, res) => {
	const userId = req.userId;
	const walidosen_id = req.params.walidosen_id;
	Perizinan.findAll({
		// where: {

		// },
		include: [
			{
				model: Semester,
				where: {
					status_semester: 1,
				},
			},
			{
				model: db.mahasiswa,
				where: {
					walidosen_id: walidosen_id,
				},
			},
		],
	})
		.then((data) => {
			const dashboardData = {
				jumlahSakit: 0,
				jumlahIzin: 0,
				totalPermohonan: 0,
				jumlah_sakit_perbulan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				jumlah_izin_perbulan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			};
			data.forEach((item) => {
				const month = item.createdAt.getMonth();
				if (item.jenis === "Sakit" && item.status === "Diverifikasi") {
					dashboardData.jumlahSakit++;
					dashboardData.jumlah_sakit_perbulan[month]++;
				} else if (item.jenis === "Izin" && item.status === "Diverifikasi") {
					dashboardData.jumlahIzin++;
					dashboardData.jumlah_izin_perbulan[month]++;
				}
				if (item.status === "Menunggu Verifikasi") {
					dashboardData.totalPermohonan++;
				}
			});
			res.send(dashboardData);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

// exports.findAll1 = (req, res) => {
// 	const userId = req.userId;
// 	const walidosen_id = req.params.walidosen_id;
// 	Perizinan.findAll({
// 		where: {
// 			status_semester: 1,
// 		},
// 		include: [
// 			{
// 				model: db.,
// 				where: {
// 					status_semester: 1,
// 				},
// 			},
// 			{
// 				model: db.mahasiswa,
// 				where: {
// 					walidosen_id: walidosen_id,
// 				},
// 			},
// 		],
// 	})
// 		.then((data) => {
// 			const dashboardData = {
// 				jumlahSakit: 0,
// 				jumlahIzin: 0,
// 				totalPermohonan: 0,
// 			};
// 			data.forEach((item) => {
// 				if (item.jenis === "Sakit" && item.status === "Diverifikasi") {
// 					dashboardData.jumlahSakit++;
// 				} else if (item.jenis === "Izin" && item.status === "Diverifikasi") {
// 					dashboardData.jumlahIzin++;
// 				}
// 				if (item.status === "Menunggu Diverifikasi") {
// 					dashboardData.totalPermohonan++;
// 				}
// 			});
// 			res.send(dashboardData);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || "Some error occurred while retrieving data.",
// 			});
// 		});
// };
