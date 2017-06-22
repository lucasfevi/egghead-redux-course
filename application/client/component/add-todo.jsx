import React from 'react';
import { connect } from 'react-redux';

let nextTodoId = 0;

const addTodo = (text) => {
  const id = nextTodoId;
  nextTodoId += 1;

  return {
    type: 'ADD_TODO',
    id,
    text,
  };
};

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={(node) => {
        input = node;
      }}
      />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);
