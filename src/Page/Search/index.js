import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import ProductItem from "~/Components/ProductItem";
import { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';




const cx = classNames.bind(styles);
function Search() {
    const search = useLocation().search;
    const key = new URLSearchParams(search).get('key');

    const [searchResult, setSearchResult] = useState([]);
    const [searchParams, setSearchParams] = useState({
        key: key,
        by:'desc'
    });
    
    
    


    useEffect(() => {
        const fetchApi = async () => {
            //setLoading(true);
            const result = await axios.get('http://localhost:8989/search-product',{params: searchParams});
            setSearchResult(result.data);
            //setLoading(false);
            
        };
        fetchApi();
    },[searchParams]);

    function SortClickHandler(searchParams)
    {
        console.log(searchParams);
    }
    return (
        <div className="container">
            
            <div className="row">
                <h2 className="search-title" >Kết quả tìm kiếm cho từ khóa  {key} </h2>
            </div>
            <div className="row">
                <div className={cx('sort-label')}>Sắp xếp theo:</div>
                <ul className={cx('sort-actions')}>
                    <li className={cx('active')} onClick={SortClickHandler('desc')} >Liên quan</li>
                    <li onClick={SortClickHandler('ctime')}>Mới nhất</li>
                    <li onClick={SortClickHandler('sales')}>Bán chạy</li>
                    <li>Giá</li>
                </ul>
            </div>

            <div className="row">
                {  (searchResult.length>0) &&  searchResult.map((result) => (
                        <ProductItem key={result.itemid} data={result} />
                    ))}
            </div>
        </div>
        
    );
}

export default Search;