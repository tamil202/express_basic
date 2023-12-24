const fs = require("fs");
const path = require('path')

const errorhandler = (error, req, res, next) => {
  res.status(500).send(error.message);
  fs.writeFileSync(path.join(__dirname, "error.txt"), error.stack);
  fs.appendFileSync(path.join(__dirname, "error.txt"), error.message);
  next();
};

module.exports = {errorhandler}