const connectToMongo = require("./db");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
connectToMongo();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(express.json());
//Routes
app.use("/api/auth", require("./routes/auth"));
// app.use("/payment", require("./routes/payment"));
// app.use("/api/notes", require("./routes/notes"));
// app.get("/", (req, res) => {
//   res.send("hii");
// });
app.get("/", (req, res) => {
  res.send("hii naman");
});
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
