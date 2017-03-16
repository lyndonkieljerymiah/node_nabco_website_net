var http = require("http");
var express = require("express");
var controllers = require("./controllers");

var app = express();

app.set('port', (process.env.PORT || 2000));
app.set("view engine", "vash");
app.use(express.static(__dirname + "/public"));

controllers.init(app);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
