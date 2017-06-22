import React from 'react';
import { connect } from 'react-redux';

let nextTodoId = 0;

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={(node) => {
        input = node;
      }}
      />
      <button onClick={() => {
        dispatch({
          type: 'ADD_TODO',
          id: nextTodoId += 1,
          text: input.value,
        });
        input.value = '';
      }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);
