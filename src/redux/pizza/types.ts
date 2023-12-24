export type FetchPizzasArgs = Record<string, string>

export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSLiceState {
    items: Pizza[];
    status: Status;
}

export type SearchPizzaParams = {
    categoryBy: string;
    sortBy: string;
    order: string;
    search: string;
    currentPage: string;
}