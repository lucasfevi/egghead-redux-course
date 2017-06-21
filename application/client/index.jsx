import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import todos from './reducer/todos';
import visibilityFilter from './reducer/visibility-filter';

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++,
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
};

const store = createStore(todoApp);

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();