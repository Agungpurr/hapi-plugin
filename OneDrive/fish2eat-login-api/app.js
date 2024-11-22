require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Fish2eat backend");
});

app.listen(port, () => {
  console.log(`Fish2Eat app listening on port ${port}`);
});
