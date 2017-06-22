import TodoReducer from './todo';

const TodosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        TodoReducer(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t => TodoReducer(t, action));
    default:
      return state;
  }
};

export default TodosReducer;
