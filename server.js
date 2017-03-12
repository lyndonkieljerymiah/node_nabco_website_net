var http = require("http");
var express = require("express");
var controllers = require("./controllers");

var port = 2000;

var app = express();
app.set("view engine", "vash");
app.use(express.static(__dirname + "/public"));
controllers.init(app);

var server = http.createServer(app);
server.listen(port);
