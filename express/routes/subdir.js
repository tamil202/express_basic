const express = require('express')
const routing = express.Router()  // import router in experess 

routing.get("/home(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname,"..", "views","components","home.html"));
});
routing.get("/about(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "components", "about.html"));
});
routing.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "components", "test.html"));
});


module.exports = routing