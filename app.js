var express = require("express");
var cors = require("cors");
var config = require("./config");
var path = require("path");

var app = express();

app.use(cors());
app.use(express.static("./public"));

// jquery
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use("/img", express.static(path.join(__dirname, "public/img")));

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`); 
	next();
})




app.listen(3000);

console.log("Server running on port 3000");