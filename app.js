const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
var morgan = require("morgan");
const app = express();
const routes = require("./routes");
let mongoose = require("mongoose");




mongoose.connect("mongodb://localhost:27017/stripe", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once("open", () => {
    console.log("Connected to MongoBD");
  })
  .on("error", err => {
    console.log(err);
  });

app.use(express.json());
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/pages')));
app.use(routes);

const port = 3000;

app.listen(port, () => console.log("Express is listening on port", port));
