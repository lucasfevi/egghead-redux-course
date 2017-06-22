import React from 'react';

const Todo = ({ completed, text, onClick }) => (
  <li style={{ textDecoration: completed ? 'line-through' : 'none' }}>
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {text}
    </span>
  </li>
);

export default Todo;
