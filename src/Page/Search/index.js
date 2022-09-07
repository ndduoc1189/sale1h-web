import ProductItem from "~/Components/ProductItem";
import { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";

import axios from 'axios';

function Search() {

    const [searchResult, setSearchResult] = useState([]);
    const [orderType, setOrderType] = useState('desc');
    const search = useLocation().search;
    const key = new URLSearchParams(search).get('key');
    useEffect(() => {
        const fetchApi = async () => {
            //setLoading(true);
            const result = await axios.get(encodeURI('http://localhost:8989/search-product?key='+key));
            setSearchResult(result.data);
            //setLoading(false);
            
        };
        fetchApi();
    }, [orderType]);


    return (
        <div className="container">
            <div className="row">
                <h2 className="search-title" >Kết quả tìm kiếm cho từ khóa  {key} </h2>
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