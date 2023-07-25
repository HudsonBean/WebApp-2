//Modules
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Variables
const app = express();

//Functions

//Main

//Middleware
app.use(express.json());
app.use(cors());

//Start database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(console.error);
//Start server
app.listen(process.env.PORT, () => {
  console.log("\x1b[34;1;3mServer started\x1b[0m");
});

//Models
const dev = require("./models/dev");

//Routing
//dev
app.get("/dev", async (req, res) => {
  const data = await dev.find();

  res.json(data);
});
