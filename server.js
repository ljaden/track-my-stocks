require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");
const mainRoutes = require("./routes/main");
const stockRoutes = require("./routes/stocks");
const dashboardRoutes = require("./routes/dashboard");

require("./config/passport")(passport);
connectDB();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Sessions
app.use(
  session({
    secret: "secret pass",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRoutes);
app.use("/stocks", stockRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
