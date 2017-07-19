const express = require("express");
const app = express();
app.subscribe(express.static("public"));
app.listen(process.env.PORT || 8080);
