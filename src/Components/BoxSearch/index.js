import classNames from 'classnames/bind';
import styles from './BoxSearch.module.scss';
import Tippy from '@tippyjs/react/headless'
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '~/hooks';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function BoxSearch() {

    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 200);

    const navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(encodeURI('http://localhost:8989/search-hint?key=' + debouncedValue), { crossdomain: true });
            setSearchResult(result.data);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleChangeSearch = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
        // console.log(searchValue);
    }

    const handleClear =(e) =>{
        setSearchValue('');
    }

    const handleSearch =(e) =>{
       
        if(searchValue.trim()){
             navigate("/search?key='" + encodeURI(searchValue) + "'");
        }
    }

    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            handleSearch();
          }
    }

    return (
        <Tippy
                visible={searchResult.length > 0 && showResult}
                interactive
                placement='bottom'
                render={attrs => (
                    <div className={cx('dropdown-results')} tabIndex="-1" {...attrs}>
                        <ul className={cx('search-hints')}>
                            {searchResult.map((result) => (
                                <li key={result.id} className={cx('search-hint-item')}>
                                    <Link to={encodeURI(`/search?key=${result.keyword}`)} >{result.keyword}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            >
        <div className={cx('box-search')}>
            <input
                    ref={inputRef}
                    value={searchValue}
                    onFocus={() => setShowResult(true)}
                    onChange={handleChangeSearch}
                    spellCheck={false}
                    onKeyDown={handleKeyDown}
                    placeholder="Tìm sản phẩm trên shopee, tiki, lazada, sendo..."
            />
            
            {loading && <span className={cx(styles.searchLoading, 'ic-24 i-loading')}></span>}

            {!!searchValue && !loading && (
                <button onClick={handleClear} className={cx('clear-btn')}><span className='ic-24 i-close'></span> </button>
            )}

            <button onClick={handleSearch}  className={cx('search-btn')}><span className='ic-24 i-find'></span> </button>
        </div >
        </Tippy>
    );
}

export default BoxSearch;