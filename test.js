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
    it("should delete a existing cut by id", function() {
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
        .then(function(_post) {
          should.not.exist(_post);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("Should modify an existing cut", function() {
      const updateCut = {
        style: "Flap",
        weight: 21000
      };
      return Cut.findOne()
        .exec()
        .then(post => {
          updateCut.id = post.id;
          return chai.request(app).put(`/cuts/${post.id}`).send(updateCut);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.style.should.equal(updateCut.style);
          res.body.weight.should.equal(updateCut.weight);

          return Cut.findById(res.body.id).exec();
        })
        .then(post => {
          post.style.should.equal(updateCut.style);
          post.weight.should.equal(updateCut.weight);
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

//return User.insertMany(seedUser);

// function seedOrderData() {
//   console.info("Seeding order data");
//   const orderData = ["delivery", "price", "cutId", "userId", "quantity"];

//   const orderDataDetails = []; //why the empty array? it will be populated with info below?
//   orderData.forEach(customerOrder => {
//     const orderDetails = {
//       delivery: "truck",
//       price: 350,
//       cutId: "seedCut", //would mongo assign this ID?
//       userId: "East Coast", //again would mongo assing this?
//       quantity: 15000 // this would leave product in inventory, how would i revise that?
//     };
//     orderDataDetails.push(orderDetails);
//   });

//   return Order.insertMany(orderDataDetails);
// }
