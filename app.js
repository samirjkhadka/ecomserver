const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv/config");

const app = express();
const env = process.env;

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());

const authRouter = require("./routes/auth");
app.use('/',authRouter);


app.get("/", (req, res) => {
  return res.status(404).send("Something went wrong");
});

const hostname = env.HOSTNAME;
const port = env.PORT;

mongoose
  .connect(env.DATABASESTRING)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, hostname, () => {
  console.log(`Server started in ${hostname}:${port}`);
});
