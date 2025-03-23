import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderId: "",
    customerName: "",
    customersPhone: "",
    guests: 0,
    tableNo: ""
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            const { name, phone, guests } = action.payload;
            state.orderId = `${Date.now()}`;
            state.customerName = name;
            state.customersPhone = phone;
            state.guests = guests;
        },
       
        removeCustomer: (state) => {
            state.orderId = "";
            state.customerName = "";
            state.customersPhone = "";
            state.guests = 0;
            state.tableNo = "";
        },
       
        updateTable: (state, action) => {
            state.tableNo = action.payload.tableNo;
        }
    }
});

export const { setCustomer, removeCustomer, updateTable } = customerSlice.actions;
export default customerSlice.reducer;