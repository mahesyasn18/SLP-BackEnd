const db = require(".././models");
const WaliKelas = db.walikelas;

function initialWaliKelas() {
  WaliKelas.create({
    id_dosenwali: "BD32022",
    nim: 221511054,
  });
}

module.exports = initialWaliKelas;
