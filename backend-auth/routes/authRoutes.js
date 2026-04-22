const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const validate = require("../middleware/validationMiddleware");

const { registerUser, loginUser } = require("../controllers/authController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================

// ✅ Register
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    // Optional: prevent users from manually setting admin role
    body("role").optional().isIn(["user"]).withMessage("Invalid role"),
  ],
  validate,
  registerUser,
);

// ✅ Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),

    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  loginUser,
);

// ================= PROTECTED ROUTES =================

// ✅ Profile (any logged-in user)
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});

// ✅ Admin-only route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
