import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import shoppingSlice from "./slice/CartSlice"
import productSlice from "./slice/ProductSlice"


export const store = configureStore({
    reducer: {
        shopping: shoppingSlice,
        products: productSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch