const express = require("express"); //how we make express available to application code
const morgan = require("morgan"); //logging middleware
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
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

////////////////////////////////////////////////////
// CUTS
////////////////////////////////////////////////////

const { Cut, Order, User } = require("./model");
app.get("/Cuts", (req, res) => {
  Cut.find()
    .exec() //tell mongo function to quick off and start running
    .then(cuts => {
      res.json(cuts.map(cut => cut.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "this isn't working. Try again" });
    });
});

app.post("/Cuts", (req, res) => {
  const requiredFieldsCuts = ["style", "weight"];
  for (let i = 0; i < requiredFieldsCuts.length; i++) {
    const field = requiredFieldsCuts[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message); //prints red text
      return res.status(400).send(message);
    }
  }
  Cut.create({
    style: req.body.style,
    weight: req.body.weight
  })
    .then(cutStyle => res.status(201).json(cutStyle.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

app.put("/cuts/:id", (req, res) => {
  // if (!(req.params && req.body && req.params === req.body)) {
  //   res.status(400).json({
  //     error: "Request body values must match"
  //   });
  // }
  const updated = {}; //const is block scoped
  const updateableFields = ["style", "weight"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  // updated is something like {style: "Flank", weight: 20000}
  Cut.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true }) //mongoose
    .exec()
    .then(updatedCut => res.status(201).json(updatedCut.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

app.delete("/cuts/:id", (req, res) => {
  Cut.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({ message: "cut has been deleted" });
    })
    .catch(err => {
      console.error(err);
      res
        .status(500)
        .json({ error: "something went wrong, cut wasn't deleted" });
    });
});

////////////////////////////////////////////////////
// ORDERS
////////////////////////////////////////////////////

app.get("/orders", (req, res) => {
  Order.find()
    .exec()
    .then(orders => {
      res.json(orders.map(order => order.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "this isn't working. Try again" });
    });
});

app.post("/Orders", (req, res) => {
  const requiredFieldsOrders = [
    //fields passed on by user
    //"id", mongo picks the id
    "delivery",
    "price",
    "cutId",
    "userId",
    "quantity"
  ];
  for (let i = 0; i < requiredFieldsOrders.length; ++i) {
    const field = requiredFieldsOrders[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Order.create({
    delivery: req.body.delivery,
    price: req.body.price, //why body?
    cutId: req.body.cutId,
    userId: req.body.userId,
    quantity: req.body.quantity
  })
    .then(orderDetails => res.status(201).json(orderDetails.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

app.delete("/orders/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({ message: "Order has been deleted" });
    })
    .catch(err => {
      console.error(err);
      res
        .status(500)
        .json({ error: "something went wrong, the order wasn't deleted" });
    });
});

app.put("/orders/:id", (req, res) => {
  const updated = {};
  const updateableFields = ["delivery", "quantity"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  Order.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .exec()
    .then(updatedOrder => res.status(201).json(updatedOrder.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    });
});

////////////////////////////////////////////////////
// USERS
////////////////////////////////////////////////////

app.get("/users", (req, res) => {
  User.find()
    .exec()
    .then(users => {
      res.json(users.map(user => user.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "this isn't working. Try again" });
    });
});

app.post("/Users", (req, res) => {
  //this is the code that creates the user
  const requiredFieldsUsers = ["email", "password"];
  for (let i = 0; i < requiredFieldsUsers.length; ++i) {
    const field = requiredFieldsUsers[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\' in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => res.status(201).json(user.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

app.use("*", function(req, res) {
  res.status(404).json({ message: "Not Found" });
}); //fall back if none of the code above functions

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
