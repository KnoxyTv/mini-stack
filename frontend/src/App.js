import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCode } from 'qrcode.react';

const API_BASE = 'https://mini-stack-ig9u.onrender.com';
// Replace this with your deployed frontend URL
const FRONTEND_URL = 'https://mini-stack-3w0tryccg-tylers-projects-38b22899.vercel.app';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE}/todos`)
      .then(res => setTodos(res.data))
      .catch(err => {
        console.error('Error fetching todos:', err);
        alert('Network error: Unable to connect to backend.');
      });
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(`${API_BASE}/todos`, { task: input });
      setTodos([...todos, { task: input }]);
      setInput('');
    } catch (err) {
      console.error('Error adding todo:', err);
      alert('Failed to add todo.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Mini To-Do App</h1>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <p>Scan to open this app anywhere:</p>
        <QRCode value={FRONTEND_URL} size={160} />
        <div style={{ fontSize: 12, marginTop: 8 }}>{FRONTEND_URL}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a new to-do"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo} style={{ padding: "8px 16px" }}>
          Add
        </button>
      </div>
      <ul style={{ marginTop: 24 }}>
        {todos.map((t, i) => <li key={i}>{t.task}</li>)}
      </ul>
    </div>
  );
}

export default App;
