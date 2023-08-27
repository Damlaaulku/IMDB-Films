import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './reducers';

const store = configureStore({
  reducer: {
    films: filmReducer
  }
});

export default store;