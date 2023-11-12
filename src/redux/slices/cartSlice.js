import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAddItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        setRemoveItem: (state, action) => {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        setClearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
        setPlusItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if(findItem) {
                findItem.count++;
            }
        },
        setMinusItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if(findItem) {
                findItem.count--;
            }
        },
    }
});

export const {
    setAddItem,
    setRemoveItem,
    setClearItems,
    setPlusItem,
    setMinusItem
} = cartSlice.actions;

export default cartSlice.reducer;