// slice.js

import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {quantity: 1},
  reducers: {
    incrementQuantity: state => {
      state.quantity += 1;
    },
    decrementQuantity: state => {
      state.quantity -= 1;
    },
  },
});

export const {incrementQuantity, decrementQuantity} = productSlice.actions;
export default productSlice.reducer;
