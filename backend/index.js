// backend/index.js

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  todos.push(req.body);
  res.status(201).json({message: 'Added'});
});

app.listen(4000, () => console.log('API running on http://localhost:4000'));
