exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  "mongodb://localhost/beef_API";
exports.TEST_DATABASE_URL = "mongodb://localhost/beef_API_TEST"; //Pointing to a diff mongo server
exports.PORT = process.env.PORT || 8080;
