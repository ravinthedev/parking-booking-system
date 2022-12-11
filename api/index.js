require("dotenv").config();
require("colors");
const express = require("express");
const { errorHandler } = require("./middleware/error");
const spotsRouter = require("./routes/spots");
const usersRouter = require("./routes/users");
const bookingsRouter = require("./routes/bookings");
const connectDB = require("./config/db");
const path = require("path");

// app config
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(errorHandler);

// endpoints
app.use("/api/spots", spotsRouter);
app.use("/api/users", usersRouter);
app.use("/api/bookings", bookingsRouter);

// DB config
connectDB();

// Server frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

// listener
app.listen(PORT, () => console.log(`app runnig on ${PORT}`.blue.bold));
