import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { numberOfClicksReducer } from './reducers';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  numberOfClicks: numberOfClicksReducer,
});

export default configureStore({
  rootReducer,
});
