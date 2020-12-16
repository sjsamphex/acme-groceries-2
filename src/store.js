import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

//action constants
const LOAD = 'LOAD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const SET_VIEW = 'SET_VIEW';

const viewReducer = (state = '', action) => {
  if (action.type === SET_VIEW) {
    state = action.view;
  }
  return state;
};

const groceriesReducer = (state = [], action) => {
  if (action.type === LOAD) {
    state = action.groceries;
  }
  if (action.type === UPDATE) {
    state = state.map((grocery) =>
      grocery.id === action.grocery.id ? action.grocery : grocery
    );
  }
  if (action.type === CREATE) {
    state = [...state, action.grocery];
  }
  return state;
};

const reducer = combineReducers({
  view: viewReducer,
  groceries: groceriesReducer,
});
const store = createStore(reducer, applyMiddleware(logger, thunk));

// const initialState = {
//   groceries: [],
//   view: '',
// };
// const store = createStore((state = initialState, action) => {
//   if (action.type === 'LOAD') {
//     state = { ...state, groceries: action.groceries };
//   }
//   if (action.type === 'UPDATE') {
//     state = {
//       ...state,
//       groceries: state.groceries.map((grocery) =>
//         grocery.id === action.grocery.id ? action.grocery : grocery
//       ),
//     };
//   }
//   if (action.type === 'CREATE') {
//     state = { ...state, groceries: [...state.groceries, action.grocery] };
//   }
//   if (action.type === 'SET_VIEW') {
//     state = { ...state, view: action.view };
//   }
//   return state;
// }, applyMiddleware(logger, thunk));

export default store;
