const express = require("express");
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "InfinityLinksSecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    project: "InfinityLinks",
    status: "running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);

module.exports = app;