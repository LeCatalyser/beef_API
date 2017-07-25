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
const { Cut, Order, User } = require("./model");
app.get("/Cuts", (req, res) => {
  Cut.find()
    .exec() //tell mongo function to quick off and start running
    .then(cuts => {
      res.json(cuts.map(cut => cut.apiRepr()));
    })
    .catch(err => {
      //here I am to catch an error in the code, no if the cut is in inventory, right?
      console.error(err);
      res.status(500).json({ error: "this isn't working. Try again" });
    });
});

app.get("/orders", (req, res) => {
  order
    .find()
    .exec()
    .then(orders => {
      res.json(orders.map(post => orders.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "this isn't working. Try again" });
    });
});

app.get("/users", (req, res) => {
  users
    .find()
    .exec()
    .then(users => {
      res.json(users.map(post => users.apiRepr()));
    }) //no ; bc I haven't completed the function
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "this isn't working. Try again" });
    });
});

app.post("/Cuts", (req, res) => {
  const requiredFields = ["style", "weight"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`; //isn't the const message and console.log repetitive?
      //I recall a simpler way to do it
      console.error(message);
      return res.status(400).send(message);
    }
  }
  CutStyle.create({
    style: req.body.style,
    weight: req.body.weight
  })
    .then(cutStyle => res.status(201).json(cutStyle.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

app.delete("/Cuts", (req, res) => {
  cutStyle
    .findAndRemove(req.params.id)
    .exec()
    .then(() => {
      //why the empty function
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

app.put("/Cuts", (req, res) => {
  cutStyle;
  if (!(req.params && req.body && req.params === req.body)) {
    res.status(400).json({
      error: "Request body values must match"
    });
  }
  const updated = {}; //doesn't this have to be an array that would be populated with required fields?
  const updateableFields = ["style", "weight"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  cutStyle
    .findAndUpdate(req.params, { $set: updated }, { new: true })
    .exec()
    .then(updatedCut => res.status(201).json(updatedCut.apiRepr()))
    .catch(err => res.status(500).json({ message: "something went wrong" }));
});

app.use("*", function(req, res) {
  res.status(404).json({ message: "Not Found" });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
