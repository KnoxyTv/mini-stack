import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    await axios.post('http://localhost:4000/todos', { task: input });
    setTodos([...todos, { task: input }]);
    setInput('');
  };

  return (
    <div>
      <h1>Mini To-Do App</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t, i) => <li key={i}>{t.task}</li>)}
      </ul>
    </div>
  );
}

export default App;
