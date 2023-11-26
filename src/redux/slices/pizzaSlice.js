import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const pizzasFetching = createAsyncThunk(
    'pizza/pizzasFetchingStatus',
    async (params) => {
        const { categoryBy, sortBy, order, search, currentPage } = params;
        const { data } = await axios.get(`https://6522c167f43b17938414dc2d.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}&${search}`);

        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [pizzasFetching.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
            //console.log('идет отправка');
        },
        [pizzasFetching.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
            //console.log('всё ок');
        },
        [pizzasFetching.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
            //console.log('была ошибка');
        }
    },
});

export const {
    setItems,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;