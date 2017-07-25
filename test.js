const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();

const { Cut, Order, User } = require("./model");
const { app, runServer, closeServer } = require("./server");
const { TEST_DATABASE_URL } = require("./config");

chai.use(chaiHttp);

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
      const cutStyle = {
        //don't need a new function, right?
        style: cutName,
        weight: 42000
      };
    });
  });
});
