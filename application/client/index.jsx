import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import TodosReducer from './reducer/todos';
import VisibilityFilterReducer from './reducer/visibility-filter';
import AddTodo from './component/add-todo';
import Footer from './component/footer';
import VisibleTodoList from './component/visible-todo-list';

const todoApp = combineReducers({
  todos: TodosReducer,
  visibilityFilter: VisibilityFilterReducer,
});

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
