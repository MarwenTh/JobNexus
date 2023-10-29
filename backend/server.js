const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userRoute");

app.use(cors());
app.use(express.json());

const url =
  "mongodb+srv://MarwenTh:EiiqUSz7eewm3kRo@cluster0.hkxf2ul.mongodb.net/";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server is running on port 5000"));
  })
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
