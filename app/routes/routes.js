module.exports = app => {
    const admin = require("../controllers/admin_controller.js");
    var router = require("express").Router();

    router.post("/", admin.create);
    router.get("/", admin.findAll);

    app.use('/api/slp', router)
};