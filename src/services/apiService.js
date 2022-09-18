import axios from "axios";

const httpRequest = axios.create({
    baseURL: 'http://localhost:8989/',
    timeout: 10000
  });

const apiService = {

    getSearchHint : async (key) =>{
        var res = await httpRequest.get('search-hint',{
            params:{
                key : key,
            }});
        return res.data;
    },

    getProducts : async (searchParams) =>{
        var res = await httpRequest.get('search-product',{
            params:searchParams});
        return res.data;
    }
};



export default apiService;