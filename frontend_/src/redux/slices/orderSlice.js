import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrderId: 1000, // Starting order ID
    loading: false,
    error: null
  },
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        id: state.currentOrderId,
        items: action.payload.items,
        total: action.payload.total,
        tax: action.payload.tax,
        customerName: action.payload.customerName,
        tableNo: action.payload.tableNo,
        status: 'pending',
        paymentMethod: action.payload.paymentMethod,
        orderDate: new Date().toISOString(),
      };
      state.orders.push(newOrder);
      state.currentOrderId += 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    }
  }
});

export const { placeOrder, setLoading, setError, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer; 