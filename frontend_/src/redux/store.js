import { configureStore } from '@reduxjs/toolkit'
import customerSlice from './slices/CustomerSlice'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'

const store = configureStore({
    reducer: {
        customer: customerSlice,
        cart : cartSlice,
        orders: orderSlice
    },
    devTools:import.meta.env.NODE_ENV !== 'production', // THIS IS TO SEE THE DATA IN REDUX STORE
   
});

export default store