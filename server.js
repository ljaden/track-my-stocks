require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const app = express();

// const mainRoutes = require("./routes/main");
const stockRoutes = require("./routes/stocks");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/", mainRoutes);
app.use("/stocks", stockRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
