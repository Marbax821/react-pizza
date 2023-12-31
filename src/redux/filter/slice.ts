import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, SortPropertyEnum, Sort } from './types';



const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: SortPropertyEnum.PRICE_DESC
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    }
});

export const {
    setCategoryId,
    setSort,
    setCurrentPage,
    setFilters,
    setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;