
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
// @ts-ignore
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchValue } from '../../redux/filter/slice';

import styles from './Search.module.scss';

const Search = () => {
    const dispatch = useDispatch()
    // const { searchValue, setSearchValue } = useContext(SearchContext);
    const { searchValue } = useSelector((state) => state.filter);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    const onClickClear = () => {
        console.log("Clearing search value");
        dispatch(setSearchValue(''));
        inputRef.current.focus();
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            console.log("Updating search value:", str);
            try {
                dispatch(setSearchValue(str));
            } catch (error) {
                console.error("Error updating search value:", error);
            }
        }, 1000),
        [],
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
        // const newValue = event.target.value;
        // console.log("New value:", newValue);
        // setValue(newValue);
        // updateSearchValue(newValue);
    }

    useEffect(() => {
        setValue(searchValue);
    }, [searchValue]);

    return (
        <div className={styles.root}>
            <input
                type="text"
                className={styles.input}
                placeholder="Поиск пиццы ..."
                value={value}
                onChange={onChangeInput}
                ref={inputRef}
            />
            <svg
                className={styles.icon}
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                />
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                />
            </svg>
            {
                value && (
                    <svg
                        onClick={onClickClear}
                        className={styles.clearIcon}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                )
            }
        </div>
    );
}

export { Search }