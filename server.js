const express = require("express"); //how we make express available to application code
const morgan = require("morgan"); //logging middleware
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(morgan("dev")); //registering morgan as a middlware function
app.use(bodyParser.json());
// our app will use bodyParser to try to
// parse JSON and/or URL encoded data from
// request bodies. If you don't add
// body parsing middleware, even if the raw
// request contains, say, a JSON body,
// `req.body` will be empty in the request handler

//app.use(bodyParser.urlencoded({extended: true}));
//this would be used if I had a from in my html

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require("./config");
// const config = require("./config");
// const DATABASE_URL = config.DATABSE_URL;
// const PORT = config.PORT;
const { Cut, Order, User } = require("./models");
app.get("/Cuts", (req, res) => {
  Cut.find()
    .exec() //tell mongo function to quick off and start running
    .then(cuts => {
      res.json(cuts.map(post => cuts.apiRepr())); //why the apiRepr
    })
    .catch(err => {
      //here I am to catch an error in the code, no if the cut is in inventory, right?
      console.error(err);
      res.status(500).json({ error: "this isn't working. Try again" });
    });
});

app.get("/orders/:id" (req, res) => {
  order.find()
  .exec()
  .then(orders => {
    res.json(orders.map(post => orders.apiRepr()));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: "this isn't working. Try again"});
  });
});

app.get("/users/:id" (req, res) => {
  users.find()
  .exec()
  .then(users => {
    res.json(users.map(post => users.apiRepr()));
  });
});



app.subscribe(express.static("public"));
app.listen(process.env.PORT || 8080); //line commands the server to start listening for client request
