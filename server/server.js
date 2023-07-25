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
app.get("/dev/all", async (req, res) => {
  //Get all data
  const data = await dev.find();
  //Response
  res.json(data);
});
app.post("/dev/new", async (req, res) => {
  //New id
  var id;
  if ((await dev.find()).length == 0) {
    id = 0;
  } else {
    id = (await dev.findOne().sort({ _id: -1 }).limit(1)).get("id") + 1;
  }
  //Create data
  const data = new dev({
    id: id,
    message: req.body.message,
  });
  data.save();
  //Response
  res.status(201).json(data);
});
app.get("/dev/:id", async (req, res) => {
  //Get data
  const data = await dev.find({ id: req.params.id });
  //Response
  if (data.length < 1) {
    res
      .status(404)
      .json({ error: "The post you were looking for could not be found." });
  } else {
    res.status(200).json(data);
  }
});
app.delete("/dev/:id/delete", async (req, res) => {
  //Get data
  const data = await dev.deleteOne({ id: req.params.id });
  //response
  res.status(202).json(data);
});
app.delete("/dev/delete/all", async (req, res) => {
  //Get data
  const data = await dev.deleteMany();
  //Response
  res.status(202).json(data);
});
