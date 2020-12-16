import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const initialState = {
  groceries: [],
  view: '',
};
const store = createStore((state = initialState, action) => {
  if (action.type === 'LOAD') {
    state = { ...state, groceries: action.groceries };
  }
  if (action.type === 'UPDATE') {
    state = {
      ...state,
      groceries: state.groceries.map((grocery) =>
        grocery.id === action.grocery.id ? action.grocery : grocery
      ),
    };
  }
  if (action.type === 'CREATE') {
    state = { ...state, groceries: [...state.groceries, action.grocery] };
  }
  if (action.type === 'SET_VIEW') {
    state = { ...state, view: action.view };
  }
  return state;
}, applyMiddleware(logger, thunk));

export default store;
