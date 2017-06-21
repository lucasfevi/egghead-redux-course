import React from 'react';

const Todo = ({ completed, text, onClick }) => (
  <li onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

export default Todo;