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

const _loadGroceries = (groceries) => ({ type: LOAD, groceries });
const loadGroceries = () => {
  return async (dispatch) => {
    const groceries = (await axios.get('/api/groceries')).data;
    dispatch(_loadGroceries(groceries));
  };
};

const _toggle = (grocery) => ({ type: UPDATE, grocery });
const toggle = (grocery) => {
  return async (dispatch) => {
    const updated = (
      await axios.put(`/api/groceries/${grocery.id}`, {
        purchased: !grocery.purchased,
      })
    ).data;
    dispatch(_toggle(updated));
  };
};

export { loadGroceries, toggle };
export default store;
