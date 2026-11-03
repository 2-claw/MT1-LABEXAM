import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json());

let tasks = [
  { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul Sharma", status: "Pending", priority: "High" },
  { id: 2, taskName: "Setup Database Schema", assignedTo: "Priya Singh", status: "Completed", priority: "Medium" },
  { id: 3, taskName: "Create Dashboard UI", assignedTo: "Amit Kumar", status: "In Progress", priority: "High" }
];

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json(task);
});

app.post('/tasks', (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body || {};
  if (!id || !taskName || !assignedTo || !status) {
    return res.status(400).json({ error: 'Missing required fields: id, taskName, assignedTo, and status' });
  }
  const newTask = { id, taskName, assignedTo, status, priority: priority || 'Medium' };
  tasks.push(newTask);
  res.status(201).json({ message: "Task added successfully", task: newTask });
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const { taskName, assignedTo, status, priority } = req.body || {};
  if (taskName) task.taskName = taskName;
  if (assignedTo) task.assignedTo = assignedTo;
  if (status) task.status = status;
  if (priority) task.priority = priority;

  res.status(200).json({ message: "Task updated successfully", task });
});

app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deletedTask = tasks.splice(index, 1)[0];
  res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});