const db = require("../models");
const Perizinan = db.perizinan;

exports.findAll = (req, res) => {
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

exports.findAllbyDosen = (req, res) => {
	const walidosen_id = req.params.walidosen_id;
	Perizinan.findAll({
		include: [
			{
				model: db.mahasiswa,
				where: {
					walidosen_id: walidosen_id,
				},
			},
		],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Perizinan.update(req.body, {
		where: { id_perizinan: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Perizinan was approved successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Perizinan with id=${id}. Maybe Perizinan was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Mahasiswa with id=" + id,
			});
		});
};

exports.findIzin = (req, res) => {
	const walidosen_id = req.params.walidosen_id;
	Perizinan.findAll({
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
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.findIzinbyDosen = (req, res) => {
	const walidosen_id = req.params.walidosen_id;
	Perizinan.findAll({
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
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.findSakits = (req, res) => {
	Perizinan.findAll({
		where: {
			jenis: "Sakit", // Cocokkan dengan ID DosenWali
			status: "Menunggu Verifikasi",
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};

exports.findSakit = (req, res) => {
	const walidosen_id = req.params.walidosen_id;
	Perizinan.findAll({
		where: {
			jenis: "Sakit",
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
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Kelas.",
			});
		});
};
