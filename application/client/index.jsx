import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import TodosReducer from './reducer/todos';
import VisibilityFilterReducer from './reducer/visibility-filter';
import Link from './component/presentational/link';
import TodoList from './component/presentational/todo-list';

const todoApp = combineReducers({
  todos: TodosReducer,
  visibilityFilter: VisibilityFilterReducer,
});

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

let nextTodoId = 0;

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate(),
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
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
FilterLink.contextTypes = {
  store: React.PropTypes.object,
};

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

const AddTodo = (props, { store }) => {
  let input;

  return (
    <div>
      <input ref={(node) => {
        input = node;
      }}
      />
      <button onClick={() => {
        store.dispatch({
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
AddTodo.contextTypes = {
  store: React.PropTypes.object,
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter,
  ),
});

const mapDispatchToProps = dispatch => ({
  onTodoClick: (id) => {
    dispatch({
      type: 'TOGGLE_TODO',
      id,
    });
  },
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'),
);
