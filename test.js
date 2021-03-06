//with this code I am simulating, what I want to happen on the front end. Describe and it syntax help with that objective

const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();

const { Cut, Order, User } = require("./model");
const { app, runServer, closeServer } = require("./server");
const { TEST_DATABASE_URL } = require("./config");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

chai.use(chaiHttp);

////////////////////////////////////////////////////
// CUTS
////////////////////////////////////////////////////

function seedCutData() {
  console.info("seeding cut data");
  const seedCut = [
    "Flap",
    "Skirt",
    "Strip-loin",
    "A-Inscos",
    "Rump-caps",
    "Flank",
    "Brisket",
    "S-Inscos"
  ];

  const seedCutStyle = [];
  seedCut.forEach(cutName => {
    // code in here runs once for each item in the seedCut array

    const cutStyle = {
      style: cutName,
      weight: 42000
    };
    seedCutStyle.push(cutStyle);
  });

  return Cut.insertMany(seedCutStyle);
}

// function generateCutName() {
//   const cutName = [

//   return cutName[Math.floor(Math.random() * cutName.length)]; //used to generate a number between 0 and the length
//   //how will I generate the numbers?
// }

function tearDownDb() {
  console.warn("Deleting database");
  return mongoose.connection.dropDatabase();
}

describe("Cut API resource", function() {
  //defining mocha tests
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedCutData();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    //it is part of the promise, right?
    it("should return all existing cuts", function() {
      let res;
      return chai
        .request(app)
        .get("/cuts")
        .then(function(thisRes) {
          res = thisRes;
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);
          return Cut.count();
        })
        .then(function(count) {
          res.body.should.have.lengthOf(count);
        });
    });

    //how to determine which ones to call...
  });

  describe("POST endpoint", function() {
    it("should add a new cut", function() {
      const newCut = {
        //don't need a new function, right?
        style: "rost-biff",
        weight: 42000
      };
      return chai.request(app).post("/Cuts").send(newCut).then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.include.keys("id", "style", "weight");
        res.body.style.should.be.a("string");
        res.body.weight.should.be.a("number");
        res.body.style.should.equal("rost-biff");
        res.body.weight.should.equal(42000);
      });
    });
  });

  describe("DELETE endpoint", function() {
    it("should delete an existing cut by id", function() {
      let cut;
      return Cut.findOne()
        .exec()
        .then(_cut => {
          cut = _cut;
          return chai.request(app).delete(`/cuts/${cut.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Cut.findById(cut.id);
        })
        .then(function(_cut) {
          should.not.exist(_cut);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("Should modify an existing cut", function() {
      const updateCut = {
        //I cannot update the value of the const
        style: "Flap",
        weight: 21000
      };
      return Cut.findOne()
        .exec()
        .then(cut => {
          updateCut.id = cut.id;
          return chai.request(app).put(`/cuts/${cut.id}`).send(updateCut);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.style.should.equal(updateCut.style);
          res.body.weight.should.equal(updateCut.weight);

          return Cut.findById(res.body.id).exec();
        })
        .then(cut => {
          cut.style.should.equal(updateCut.style);
          cut.weight.should.equal(updateCut.weight);
        });
      //find a current cut
      //modify the cut
      //give it the paramenters for how to modify the cut
      //return to inventory
      //query the database to confirm the change has been applied
    });
  });
});

////////////////////////////////////////////////////
// USERS
////////////////////////////////////////////////////

function userSeedData() {
  console.info("Seeding User information");
  //need to create dummy users

  const userDetails = [
    {
      email: "user1@gmail.com",
      password: bcrypt.hashSync("bacon", 8)
    },

    {
      email: "user2@gmail.com",
      password: bcrypt.hashSync("ham", 9)
    },

    {
      email: "user3@gmail.com",
      password: bcrypt.hashSync("lettuce", 10)
    }
  ];

  return User.insertMany(userDetails);
}

function tearDownDb() {
  //what am I achieving here?
  console.warn("Deleting database");
  return mongoose.connection.dropDatabase();
}

describe("USER API resource", function() {
  //scaffolding of tests
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return userSeedData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    //this code runs once on travis
    it("Should validate users", function() {
      let res;
      return chai
        .request(app)
        .get("/Users")
        .then(function(thisRes) {
          res = thisRes;
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(3);
          return User.count(); //count is referring to the number of users in the system
        })
        .then(function(count) {
          res.body.should.have.lengthOf(count); //referring to users, not length of password
        });
    });
  });

  describe("POST endpoint", function() {
    it("should add a new user", function() {
      const newUser = {
        email: "user4@gmail.com",
        password: "turkey"
      };
      return chai.request(app).post("/Users").send(newUser).then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.include.keys("email", "id");
      });
    });
  });
});

////////////////////////////////////////////////////
// ORDERS
////////////////////////////////////////////////////

function orderSeedData() {
  console.info("Seeding order info");

  return Promise.all([seedCutData(), userSeedData()]).then(function(data) {
    //mongoose insert.many calls
    // var cuts = data[0];
    // var users = data[1];

    const [cuts, users] = data;

    const seedOrdersArray = [];
    cuts.forEach(cut => {
      const newOrder = {
        delivery: "2018-01-01",
        price: 450,
        cutId: cut._id,
        userId: users[0]._id,
        quantity: 20000
      };
      seedOrdersArray.push(newOrder);
    });
    return Order.insertMany(seedOrdersArray);
  });
}

describe("ORDER API resource", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return orderSeedData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    it("Should validate orders", function() {
      let res;
      return chai
        .request(app)
        .get("/Orders")
        .then(function(thisRes) {
          res = thisRes;
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);
          return Order.count();
        })
        .then(function(count) {
          res.body.should.have.lengthOf(count);
        });
    });
  });

  describe("POST endpoint", function() {
    it("should add a new order", function() {
      return Promise.all([Cut.findOne(), User.findOne()]).then(function(data) {
        const [cut, user] = data;

        const newOrder = {
          delivery: "2018-02-18", //do I actually set in the delivery location?
          price: 350, //how do I connect I assign price per endpoint?
          userId: user._id,
          quantity: 16000,
          cutId: cut._id //how do I manage the inventory?
        };
        return chai
          .request(app)
          .post("/Orders")
          .send(newOrder)
          .then(function(res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.include.keys(
              "delivery",
              "price",
              "userId",
              "quantity",
              "cutId"
            );
          });
      });
    });
  });

  describe("DELETE endpoint", function() {
    it("should delete an existing Order by id", function() {
      let order; // diference between promise. doesn't this
      return Order.findOne()
        .exec()
        .then(_order => {
          order = _order;
          return chai.request(app).delete(`/orders/${order.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Order.findById(order.id);
        })
        .then(function(_order) {
          should.not.exist(_order);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("Should modify an existing order", function() {
      const updateOrder = {
        delivery: "2017-09-11T00:00:00.000Z",
        quantity: 12000
      };
      return Order.findOne()
        .exec()
        .then(order => {
          updateOrder.id = order.id;
          return chai.request(app).put(`/orders/${order.id}`).send(updateOrder);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.delivery.should.equal(updateOrder.delivery);
          res.body.quantity.should.equal(updateOrder.quantity);

          return Order.findById(res.body.id).exec();
        })
        .then(order => {
          order.delivery.toISOString().should.equal(updateOrder.delivery);
          order.quantity.should.equal(updateOrder.quantity);
        });
    });
  });
});
