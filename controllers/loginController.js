(function (loginController) {

    var loginModel = {
        userName: "",
        password: ""
    };

    loginController.init = function (app) {
        app.get("/admin/login", function (req, res) {
            res.render("login_index", loginModel);
        });
    }
})(module.exports);