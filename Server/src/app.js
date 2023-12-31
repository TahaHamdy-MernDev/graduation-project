process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message ,err.stack);
  process.exit(1);
});
const path =require("path")
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("./config/database");
let logger = require("morgan");
app.use(require("./utils/response/responseHandler"));
const passport = require("passport"); 
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { googlePassportStrategy } = require("./config/googlePassportStrategy");
// const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors({
  origin :["http://localhost:5173"],
  credentials: true
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.JWT_SECRET_TOKEN,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

googlePassportStrategy(passport);

app.use("/api/v1", require("./routes/index"));
// app.use('/uploads', express.static('./uploads'))
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!  Shutting down...");
  console.log(err.name, err.message ,err.stack);
  server.close(() => {
    process.exit(1);
  });
});
