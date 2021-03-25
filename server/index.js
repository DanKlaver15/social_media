const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const users = require("./routes/user");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});