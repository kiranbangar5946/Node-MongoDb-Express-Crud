var express = require("express");
var app = express();
var cors = require('cors')
app.use(cors())


var categoryRoutes = require("./controllers/CategoryController");
var productRoutes = require("./controllers/ProductController");

var bodyParser = require("body-parser");
var { global } = require("./config/globals");
process.env.NODE_ENV = !process.env.NODE_ENV
? "development"
: process.env.NODE_ENV;

global.env=require(__dirname + "/config/env/" + process.env.NODE_ENV);
 require("./config/database");
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Error handling
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

// use express router
app.use("/Category", router);
app.use("/Product", router);

//call  routing
categoryRoutes(router); 
productRoutes(router);
const port = process.env.PORT || 4000;

app.listen( port, (req, res) => {
  console.log(`Server is running on ${port} port.`);
});



