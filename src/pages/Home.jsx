import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QueryString from 'qs';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaSkeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { list } from '../components/Sort';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage } = useSelector(state => state.filter);

    const { searchValue } = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `search=${searchValue}` : '';

    const skeletonItem = [... new Array(6)].map((_, i) => (
        <Skeleton key={i} />
    ));
    const pizzasItems = pizzas.map((item, i) => (
        <PizzaBlock key={i} {...item} />
    ));

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const fetchPizzas = () => {
        setIsLoading(true);
        axios.get(`https://6522c167f43b17938414dc2d.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}&${search}`)
            .then((res) => {
                setPizzas(res.data);
                setIsLoading(false);
            });
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
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletonItem : pizzasItems
                }
            </div>
            <Pagination />
        </div>
    );
}

export { Home };