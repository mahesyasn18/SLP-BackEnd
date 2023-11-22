const db = require(".././models");
const MataKuliah = db.matakuliah;

function initialMataKuliah() {
	MataKuliah.create({
		id_matakuliah: "21IF2010",
		nama_matakuliah: "Matematika Diskrit",
		semester_matakuliah: 2,
	});
	MataKuliah.create({
		id_matakuliah: "21IF2011",
		nama_matakuliah: "Pemrograman Beriorientasi Objek",
		semester_matakuliah: 1,
	});
	MataKuliah.create({
		id_matakuliah: "21IF2012",
		nama_matakuliah: "Basis Data",
		semester_matakuliah: 1,
	});
	MataKuliah.create({
		id_matakuliah: "21IF2013",
		nama_matakuliah: "Pengantar Rekayasa Perangkat Lunak",
		semester_matakuliah: 2,
	});
	MataKuliah.create({
		id_matakuliah: "21IF2014",
		nama_matakuliah: "Aljabar Linear",
		semester_matakuliah: 2,
	});
	MataKuliah.create({
		id_matakuliah: "21IF2015",
		nama_matakuliah: "Komputer Grafik",
		semester_matakuliah: 1,
	});
	MataKuliah.create({
		id_matakuliah: "21IF2016",
		nama_matakuliah: "Proyek 3 : Pengembangan Perangkat Lunak Berbasis Web",
		semester_matakuliahv: 1,
	});
}
module.exports = initialMataKuliah;
