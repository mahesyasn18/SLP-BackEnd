const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

//for react
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "slp-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

//for db
const db = require("./app/models");
const seeders = require("./app/seeders");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  seeders.initialRole();
  seeders.initialAdmin();
  seeders.initialKelas();
  seeders.initialProdi();
  seeders.initialAngkatan();
  seeders.intialSemester();
  seeders.initialMahasiswa();
  seeders.initialMataKuliah();
  seeders.initialDetailMataKuliah();
});
// db.sequelize.sync({ force: true });
// db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "Welcome To SLP apps" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
