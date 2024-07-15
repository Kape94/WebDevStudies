const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.status(201).json({ message: "Task added" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
