import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import ProductItem from "~/Components/ProductItem";
import { useEffect, useState } from 'react';
import {useSearchParams} from "react-router-dom";
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

    const [searchParams] = useSearchParams();
    const [isLoading,SetIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [sParams, setSParams] = useState({
        key: searchParams.get('key'),
        by:'relevancy'
    }); 
    const SortClickHandler = (sortType)=>{
        if(!isLoading){
            SetIsLoading(true);
            let updatedValue = {};
            updatedValue = {by:sortType};
            setSParams(searchParams => ({
                ...searchParams,
                ...updatedValue
              }))
        }
       
    };

    const handlerSourceClick =(source) =>{
        
    }
    useEffect(() => {
                SetIsLoading(true);
                let updatedValue = {};
                updatedValue = {key:searchParams.get('key')};
                setSParams(searchParams => ({
                    ...searchParams,
                    ...updatedValue
                  }))
    },[searchParams]);

    useEffect(() => {
        const fetchApi = async () => {
            SetIsLoading(true);
            const result = await  apiService.getProducts(sParams);
            setSearchResult(result);
            SetIsLoading(false);
            
        };
        fetchApi();
    },[sParams]);

    return (
        <div className="container">
            
            <div className="row">
                <h2 className="search-title" >Kết quả tìm kiếm cho từ khóa  {searchParams.get('key')} </h2>
            </div>
            <div className={cx("sort-section")}>
            <ul className={cx('source-list')}>
                    {
                        config.dataSources.map((item, index) => (
                            <li  className={cx('sort-item')} onClick={ () => handlerSourceClick(item.name)} key={item.index}>{item.name}</li>
                        ))
                    }
                </ul>
                <div className={cx('sort-label')}>Sắp xếp theo:</div>
                <ul className={cx('sort-actions')}>
                    {lstSort.map((item)=>(
                        <li onClick={ () => SortClickHandler(item.key)}  className={cx('sort-item') +" "+ (sParams.by === item.key ? cx('active') : '')} key={item.key}>{item.value}</li>
                    ))}
                </ul>
                
            </div>

            <div className="row">
                {isLoading && ( 
                    <ProductLoading numItem={16} />
                )}

                { !isLoading &&  (searchResult.length>0) &&  searchResult.map((result,index) => (
                        <ProductItem key={index} data={result} />
                    ))}

            </div>
        </div>
        
    );
}

export default Search;