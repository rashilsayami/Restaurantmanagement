import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const TAX_RATE = 0.13; // 13% tax rate

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, quantity = 1 } = action.payload;
            const existingItem = state.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.push({ id, name, price, quantity });
            }
        },
        
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            return state.filter(item => item.id !== itemId);
        },
        
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        
        resetCart: () => {
            return initialState;
        }
    }
});

// Selectors
export const selectCartSubtotal = (state) => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const selectCartTax = (state) => {
    const subtotal = selectCartSubtotal(state);
    return subtotal * TAX_RATE;
};

export const selectCartTotal = (state) => {
    const subtotal = selectCartSubtotal(state);
    const tax = subtotal * TAX_RATE;
    return subtotal + tax;
};

export const selectCartItemsCount = (state) => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
};

export const { addToCart, removeFromCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;