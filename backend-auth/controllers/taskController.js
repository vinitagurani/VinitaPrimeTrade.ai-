const Task = require("../models/Task");
const asyncHandler = require("../middleware/asyncHandler");
const redisClient = require("../config/redis");
// CREATE
exports.createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user._id,
  });

  res.status(201).json(task);
});

// GET
// exports.getTasks = asyncHandler(async (req, res) => {
//   let tasks;

//   if (req.user.role === "admin") {
//     tasks = await Task.find().populate("createdBy", "name email");
//   } else {
//     tasks = await Task.find({ createdBy: req.user._id });
//   }

//   res.json(tasks);
// });

exports.getTasks = async (req, res) => {
  const cacheKey = `tasks:${req.user._id}:${req.user.role}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const tasks =
    req.user.role === "admin"
      ? await Task.find()
      : await Task.find({ createdBy: req.user._id });

  await redisClient.setEx(cacheKey, 60, JSON.stringify(tasks));

  res.json(tasks);
};

// UPDATE
exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // ownership or admin
  if (
    req.user.role !== "admin" &&
    task.createdBy.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to update this task");
  }

  task.title = req.body?.title || task.title;
  task.description = req.body?.description || task.description;

  const updatedTask = await task.save();

  res.json(updatedTask);
});

// DELETE
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Only admin can delete tasks");
  }

  await task.deleteOne();

  res.json({ message: "Task deleted" });
});
