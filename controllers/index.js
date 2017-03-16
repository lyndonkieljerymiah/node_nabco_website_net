(function (controllers) {
    var homeController = require("./homeController");
    var loginController = require("./loginController");
    
    controllers.init = function (app) {
        homeController.init(app);
        loginController.init(app);
    };

})(module.exports);