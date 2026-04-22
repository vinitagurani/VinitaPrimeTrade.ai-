const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const validate = require("../middleware/validationMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

// ✅ Create → user/admin
router.post(
  "/",
  protect,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),
  ],
  validate,
  createTask,
);

// ✅ Read → user/admin
router.get("/", protect, getTasks);

// ✅ Update → user (own) + admin
router.put(
  "/:id",
  protect,
  [
    body("title")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ],
  validate,
  updateTask,
);

// ✅ Delete → admin only (handled inside controller)
router.delete("/:id", protect, deleteTask);

module.exports = router;
