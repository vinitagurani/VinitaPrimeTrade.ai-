const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/v1/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.use("/api/v1/tasks", require("./routes/taskRoutes"));

const API_VERSION = "/api/v1";

app.use(`${API_VERSION}/auth`, require("./routes/authRoutes"));
app.use(`${API_VERSION}/tasks`, require("./routes/taskRoutes"));

// AFTER routes
app.use(errorHandler);

app.use(mongoSanitize());
app.use(xss());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);