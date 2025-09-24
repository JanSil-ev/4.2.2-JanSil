import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
}

const shoppingSlice = createSlice({
  name: 'cart',
  initialState: { items: [] } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { addItem, removeItem , editItem} = shoppingSlice.actions;
export default shoppingSlice.reducer;
