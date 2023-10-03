const db = require(".././models");
const Semester = db.semester;

function intialSemester() {
  Semester.create({
    id_semester: "01-2023",
    nama_semester: "Ganjil 2023/2024",
  });
}
module.exports = intialSemester;
