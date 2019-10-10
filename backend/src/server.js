require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => console.log(err));

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);
