import {configureStore} from '@reduxjs/toolkit';
import productReducer from './Slice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
