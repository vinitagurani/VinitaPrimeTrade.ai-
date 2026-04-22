const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const logger = require("./utils/logger");

dotenv.config();
connectDB();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// Security middlewares
app.use(mongoSanitize());
app.use(xss());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Request logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// ===== ROUTES =====
const API_VERSION = "/api/v1";

app.use(`${API_VERSION}/auth`, require("./routes/authRoutes"));
app.use(`${API_VERSION}/tasks`, require("./routes/taskRoutes"));

// ===== ERROR HANDLER (MUST BE LAST) =====
app.use(errorHandler);

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
