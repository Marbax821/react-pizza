import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { PizzaSLiceState, Status, Pizza, SearchPizzaParams } from './types';



const initialState: PizzaSLiceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
}

export const pizzasFetching = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/pizzasFetchingStatus',
    async (params) => {
        const { categoryBy, sortBy, order, search, currentPage } = params;
        const { data } = await axios.get(`https://6522c167f43b17938414dc2d.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}&${search}`);

        return data as Pizza[];
    }
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(pizzasFetching.pending, (state, action) => {
            state.items = [];
            state.status = Status.LOADING;
        });

        builder.addCase(pizzasFetching.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(pizzasFetching.rejected, (state, action) => {
            state.items = [];
            state.status = Status.ERROR;
        });
    }
});

export const {
    setItems,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;