const express = require("express"),
  fs = require("fs"),
  path = require("path"),
  bodyParser = require("body-parser"),
  app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//    res.send('Hello from the web server side...')
// });

app.use((req, res, next) => {
  console.log(`${req.url}\n`);
  next();
});

app.post("/contact-form", (req, res) => {
  let userArray = [];

  let users = {
    email: req.body.email,
    name: req.body.name,
  };

  let data = JSON.stringify(users);

  console.log(users.name);
  console.log(users.email);
  res.send("TY for submitting your contact form!");
  fs.appendFile("./form-submissions.json", data, (err) => {
    if (err) throw err;
    userArray.push(data)
    console.log("successful");
  });
});

app.use("/", express.static(path.join(__dirname, "../public")));

app.listen(3000);
