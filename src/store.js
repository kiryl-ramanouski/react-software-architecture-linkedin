import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { numberOfClicksReducer } from './reducers';

const rootReducer = combineReducers({
  numberOfClicks: numberOfClicksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
