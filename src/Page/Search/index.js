import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import ProductItem from "~/Components/ProductItem";
import { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';




const cx = classNames.bind(styles);

function Search() {
    //https://shopee.vn/api/v4/search/search_items?by=ctime&keyword=%C3%A1o%20kho%C3%A1c&limit=60&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2
    //https://shopee.vn/api/v4/search/search_items?by=sales&keyword=%C3%A1o%20kho%C3%A1c&limit=60&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2
    const lstSort = [
        {key:"relevancy", value:"Liên quan",},
        {key:"ctime",value:"Mới nhất"},
        {key:"sales",value:"Bán nhiều"}
    ];


    const search = useLocation().search;
    const key = new URLSearchParams(search).get('key');
    const [isLoading,SetIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchParams, setSearchParams] = useState({
        key: key,
        by:'relevancy'
    });
    
    const SortClickHandler = (sortType)=>{
        if(!isLoading){
            SetIsLoading(true);
            let updatedValue = {};
            updatedValue = {by:sortType};
            setSearchParams(searchParams => ({
                ...searchParams,
                ...updatedValue
              }))
            console.log(searchParams);
        }
       
    };

    useEffect(() => {
        const fetchApi = async () => {
            SetIsLoading(true);
            const result = await axios.get('http://localhost:8989/search-product',{params: searchParams});
            setSearchResult(result.data);
            SetIsLoading(false);
            
        };
        fetchApi();
    },[searchParams]);

    return (
        <div className="container">
            
            <div className="row">
                <h2 className="search-title" >Kết quả tìm kiếm cho từ khóa  {key} </h2>
            </div>
            <div className={cx("sort-section")}>
                <div className={cx('sort-label')}>Sắp xếp theo:</div>
                <ul className={cx('sort-actions')}>
                    {lstSort.map((item)=>(
                        <li onClick={ () => SortClickHandler(item.key)}  className={searchParams.by === item.key ? cx('active') : ''} key={item.key}>{item.value}</li>
                    ))}
                </ul>
            </div>

            <div className="row">
                {isLoading && (
                    <div>Đang tải dữ liệu....</div>
                )}

                { !isLoading &&  (searchResult.length>0) &&  searchResult.map((result,index) => (
                        <ProductItem key={index} data={result} />
                    ))}

            </div>
        </div>
        
    );
}

export default Search;