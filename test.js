const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();

const { Cut, Order, User } = require("../model");
const { app, runServer, closeServer } = require("../server");
const { TEST_DATABASE_URL } = require("../config");

chai.use(chaiHttp);

function seedCutData() {
  console.info("seeding cut data");
  const seedCut = [];

  for (let i = 1; i <= 10; i++) {
    seedCut.push(generateCut());
  }
  return Cut.insertMany(seedCutData);
}

function generateCutName() {
  const cutName = [
    "Flap",
    "Skirt",
    "Strip-loin",
    "A-Inscos",
    "Rump-caps",
    "Flank",
    "Brisket",
    "S-Inscos"
  ];
  return cutName[Math.floor(Math.random() * cutName.length)]; //used to generate a number between 0 and the length
  //how will I generate the numbers
}
