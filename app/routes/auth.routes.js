const controller = require("../controllers/auth_controller");

module.exports = function(app) {
    
    app.post("/api/auth/signin", controller.signin);
  
    app.post("/api/auth/signout", controller.signout);
  };