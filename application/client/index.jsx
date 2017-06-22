import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import TodosReducer from './reducer/todos';
import VisibilityFilterReducer from './reducer/visibility-filter';
import AddTodo from './component/presentational/add-todo';
import Link from './component/presentational/link';
import TodoList from './component/presentational/todo-list';

const todoApp = combineReducers({
  todos: TodosReducer,
  visibilityFilter: VisibilityFilterReducer,
});

const store = createStore(todoApp);

let nextTodoId = 0;

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate(),
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
          });
        }}
      >
        {props.children}
      </Link>
    );
  }
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter="SHOW_ALL"
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_ACTIVE"
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_COMPLETED"
    >
      Completed
    </FilterLink>
  </p>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo
      onAddClick={(text) => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId += 1,
          text,
        });
      }}
    />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id,
        })
      }
    />
    <Footer />
  </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root'),
  );
};

store.subscribe(render);
render();
