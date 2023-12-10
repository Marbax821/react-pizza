import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QueryString from 'qs';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaSkeleton';
import { Pagination } from '../components/Pagination';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { list } from '../components/Sort';
import { pizzasFetching } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, setSearchValue } = useSelector((state: any) => state.filter);
    const { items, status } = useSelector((state: any) => state.pizza);

    // const { searchValue } = useContext(SearchContext);

    const skeletonItem = [... new Array(6)].map((_, i) => (
        <Skeleton key={i} />
    ));
    const pizzasItems = items.map((item: any, i: number) => (
        <PizzaBlock key={i} {...item} />
    ));

    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx));
    };

    const fetchPizzas = async () => {
        const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = setSearchValue ? `search=${setSearchValue}` : '';

        // @ts-ignore
        dispatch(pizzasFetching({
            categoryBy,
            sortBy,
            order,
            search,
            currentPage
        }));
        // window.scrollTo(0, 0);
    };

    // Если изменили параметры и первый рендер был 
    useEffect(() => {
        if (isMounted.current) {
            const queryStr = QueryString.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryStr}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, setSearchValue, currentPage]);

    // Если был первый рендер то проверяем URL параметры и сохраняем в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = QueryString.parse(window.location.search.substring(1));

            const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, []);

    // Если был первый рендер то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, setSearchValue, currentPage]);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ?
                    <div className='content__error-info'><h2>Не удалось загрузить пиццы...попробуйте перезагрузить страницу</h2></div>
                    :
                    <div className="content__items">
                        {status === 'loading' ? skeletonItem : pizzasItems}
                    </div>
            }

            <Pagination />
        </div>
    );
}

export { Home };