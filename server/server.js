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
app.post("/dev/new", async (req, res) => {
  //New id
  const id = (await dev.findOne().sort({ _id: -1 }).limit(1)).get("id") + 1;
  //Create data
  const data = new dev({
    id: id,
    message: req.body.message,
  });
  data.save();
  res.status(202).json(data);
});
