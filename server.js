const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

const db = require("./app/models");

const Role = db.role;

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to SLP Application" });
});

function initial() {
  Role.create({
    id: 1,
    name: "admin"
  });
 
  Role.create({
    id: 2,
    name: "user"
  });
}



require('./app/routes/auth.routes')(app);
require("./app/routes/routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});