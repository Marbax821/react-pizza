import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartSliceState, CartItemType } from '../cart/types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    items,
    totalPrice,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAddItem: (state, action: PayloadAction<CartItemType>) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        setRemoveItem: (state, action: PayloadAction<string>) => {
            const removedItem = state.items.find(obj => obj.id === action.payload);

            if (removedItem) {
                // Уменьшаем общую стоимость на стоимость удаленного товара, умноженную на его количество
                state.totalPrice -= removedItem.price * removedItem.count;

                // Удаляем элемент из корзины
                state.items = state.items.filter(obj => obj.id !== action.payload);
            }
        },
        setClearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
        setPlusItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count++;
            }
        },
        setMinusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
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