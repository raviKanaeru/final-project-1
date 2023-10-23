const express = require("express");
const app = express();
const routes = require("./routers");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Final Project 1");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
