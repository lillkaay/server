require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use(authMiddleware);
app.use("/project", projectRoutes);

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`);
});
