const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tasks = [];
let currentId = -1;

// Validation helper function
const validateTaskData = (title, completed) => {
  if (typeof title !== 'string' || title.trim() === '') {
    return { isValid: false, message: 'Title needs to be a word' };
  }

  if (completed === undefined || typeof completed !== 'boolean') {
    return { isValid: false, message: 'Completed has to be a boolean' };
  }

  return { isValid: true };
};

// GET /tasks - Find all tasks
app.get('/tasks', (req, res) => {
  return res.json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  const validation = validateTaskData(title, completed);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const newTask = {
    id: currentId++,
    title: title.trim(),
    completed
  };

  tasks.push(newTask);
  res.status(201).json({
    message: 'Created succesfully',
    data: newTask
  });
});

// PUT /tasks - Updated a existing task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((value) => value.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, completed } = req.body;

  const validation = validateTaskData(title, completed);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: title.trim(),
    completed
  };

  tasks[taskIndex] = updatedTask;

  res.status(200).json({
    message: 'Updated successfully',
    data: updatedTask
  });
});

// DELETE /tasks - Deletes a existing task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((value) => value.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: 'Deleted successfully',
    data: tasks
  });
});

// Create the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
