import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import ProductItem from "~/Components/ProductItem";
import { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import {apiService} from "~/services";
import config  from '~/Config';
import ProductLoading from '~/Components/ProductLoading';


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
            const result = await  apiService.getProducts(searchParams);
            setSearchResult(result);
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
            <ul className={cx('source-list')}>
                    {
                        config.dataSources.map((item, index) => (
                            <li  className={cx('sort-item')} onClick={ () => SortClickHandler(item.name)} key={item.index}>{item.name}</li>
                        ))
                    }
                </ul>
                <div className={cx('sort-label')}>Sắp xếp theo:</div>
                <ul className={cx('sort-actions')}>
                    {lstSort.map((item)=>(
                        <li onClick={ () => SortClickHandler(item.key)}  className={cx('sort-item') +" "+ (searchParams.by === item.key ? cx('active') : '')} key={item.key}>{item.value}</li>
                    ))}
                </ul>
                
            </div>

            <div className="row">
                {isLoading && ( 
                    <>
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                    </>
                )}

                { !isLoading &&  (searchResult.length>0) &&  searchResult.map((result,index) => (
                        <ProductItem key={index} data={result} />
                    ))}

            </div>
        </div>
        
    );
}

export default Search;