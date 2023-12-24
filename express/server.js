// import section 

const server = require('express'); // main express import
const path = require('path');   // path import 
require('dotenv').config(); // enviroment access import and config
const port = process.env.PORT || 3001  // enviroment  access
const cors = require('cors') // import third-party middleware
const { errorhandler } = require("./middleware/errorhandler");  // error handler import

const app = server(); // change to another varbile of express functions

//  built in middleware 

app.use(server.urlencoded({ extended: false })); // form validation 
app.use(server.json()) // json handling
app.use(server.static(path.join(__dirname, "./public"))); // access to allow th files

// another way routing in express

app.use('/subdir',require('./routes/subdir'))

// custom middleware

app.use((req,res,next) => {
  console.log(`${req.method}\n${req.url}\n${req.headers.origin}\n${req.body}`);
  next();
})

// third-party middleware

// resource sharing 
const list = [
  "www.yoursite.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8000", ,
  "www.someothersite.com",
  "www.google.com",
];

const access = {
  origin: (origin, callback) => {
    if (list.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Something went wrong"));
    }
  },
  optionsSuccessStatus:200
}
app.use(cors(access));

// routing and files 

app.get("^/$|index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})
 app.get("^/old-page", (req, res) => {
    res.redirect(301, path.join(__dirname, "views", "index.html"));
 });
app.get('/chain(.html)?', (req,res,next) => {
  res.sendFile(path.join(__dirname, "views", "loading.html"));
  next()     // chain of routing 
}, (req,res) => {
  res.sendFile(path.join(__dirname, "views", "loading.html"));
})
app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404found.html"));
});

// error handlers

app.use(errorhandler);

// port 

 app.listen(port, () => {
    console.log(`server start at http://localhost${port}`);
  });