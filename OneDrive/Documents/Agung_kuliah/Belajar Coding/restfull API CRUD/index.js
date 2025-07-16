/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const app = express();

require("dotenv").config();

// ? conection ke database
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_LOCAL);
// ? cek koneksi database
const cekDB = mongoose.connection;
cekDB.on("error", (error) => {
  console.log(error);
});

cekDB.once("open", () => {
  console.log(`Database Connected`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ? User Router
const userRouter = require("./routes/userRoute");
app.use(userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server ini berjalan di http://localhost:${PORT}`);
});
