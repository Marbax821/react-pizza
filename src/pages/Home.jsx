import { useContext, useEffect, useState } from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaSkeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const {searchValue} = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sort: 'rating'
    });
    const [currentPage, setCurrentPage] = useState(1);

    const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sort.replace('-', '');
    const order = sortType.sort.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `search=${searchValue}` : '';

    const skeletonItem = [... new Array(6)].map((_, i) => (
        <Skeleton key={i} />
    ));
    const pizzasItems = pizzas.map((item, i) => (
        <PizzaBlock key={i} {...item} />
    ));

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://6522c167f43b17938414dc2d.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}&${search}`)
            .then((res) => {
                return res.json();
            })
            .then(arr => {
                setPizzas(arr);
                setIsLoading(false);
            });
        // window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={(i) => setCategoryId(i)} />
                <Sort sortType={sortType} onSortClick={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletonItem : pizzasItems
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
}

export { Home };